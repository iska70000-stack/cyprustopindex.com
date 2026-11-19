"""
Isolated Hermes Agent callback handler for CyprusTopIndex moderation buttons.
Triggered from gateway/platforms/telegram.py when callback_data starts with "cti:".
Includes instant _safe_answer, non-blocking asyncio.to_thread, and 409 duplicate guard.
"""
import os
import json
import html
import asyncio
import urllib.request
import urllib.error


CTI_MODERATION_URL = os.getenv("CTI_MODERATION_URL", "http://127.0.0.1:4391/internal/moderation")
CTI_INTERNAL_SECRET = os.getenv("CTI_INTERNAL_SECRET", "")


async def _safe_answer(query, text: str | None = None, show_alert: bool = False) -> None:
    try:
        await query.answer(text=text, show_alert=show_alert)
    except Exception:
        pass


async def _post_moderation_async(payload: dict) -> tuple[int, dict]:
    return await asyncio.to_thread(_post_moderation, payload)


def _post_moderation(payload: dict) -> tuple[int, dict]:
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        CTI_MODERATION_URL,
        data=data,
        headers={
            "Content-Type": "application/json",
            "X-Internal-Secret": CTI_INTERNAL_SECRET,
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8", errors="replace")
        try:
            return e.code, json.loads(raw)
        except Exception:
            return e.code, {"ok": False, "error": raw}


async def handle_cti_callback(query, bot, caller_id: str, parse_mode_html) -> None:
    data = getattr(query, "data", "") or ""
    parts = data.split(":", 2)
    if len(parts) != 3:
        await _safe_answer(query, text="Некорректный формат кнопки", show_alert=True)
        return

    _, action, submission_id = parts
    chat_id = query.message.chat_id

    if action == "details":
        await _safe_answer(query, text="[CYPRUS] Загружаю детали...")
        status, res = await _post_moderation_async({
            "action": "details",
            "submissionId": submission_id,
            "adminUserId": caller_id,
        })
        if not res.get("ok"):
            await bot.send_message(chat_id=chat_id, text=f"❌ [CYPRUS] Ошибка: {res.get('error', status)}")
            return

        sub = res["submission"]
        p = sub["payload"]
        details_text = (
            f"🇨🇾 <b>[CYPRUS] Детали заявки {html.escape(sub['id'])}</b>\n\n"
            f"<b>Статус:</b> {html.escape(sub['status'])} | <b>Публикация:</b> {html.escape(sub['publishStatus'])}\n"
            f"<b>Город:</b> {html.escape(sub['city'])}\n"
            f"<b>Категория:</b> <code>{html.escape(sub['categorySlug'])}</code>\n"
            f"<b>Компания:</b> {html.escape(p.get('name', ''))}\n"
            f"<b>Телефон:</b> {html.escape(p.get('phone', ''))}\n"
            f"<b>WhatsApp:</b> {html.escape(p.get('whatsapp') or '—')}\n"
            f"<b>Сайт:</b> {html.escape(p.get('website') or '—')}\n"
            f"<b>Описание:</b> {html.escape(p.get('description', ''))}"
        )
        await bot.send_message(chat_id=chat_id, text=details_text, parse_mode=parse_mode_html, disable_web_page_preview=True)
        return

    if action == "reject":
        await _safe_answer(query, text="[CYPRUS] Отклоняю заявку...")
        status, res = await _post_moderation_async({
            "action": "reject",
            "submissionId": submission_id,
            "adminUserId": caller_id,
            "reason": "",
        })
        if status == 409:
            await _safe_answer(query, text=f"Заявка уже обработана ({res.get('status')})", show_alert=True)
            return
        if not res.get("ok"):
            await bot.send_message(chat_id=chat_id, text=f"❌ [CYPRUS] Ошибка отклонения {submission_id}: {res.get('error', status)}")
            return

        base_html = getattr(query.message, "text_html", None) or html.escape(getattr(query.message, "text", "") or "")
        await query.edit_message_text(
            text=f"{base_html}\n\n❌ <b>[CYPRUS] Отклонено</b>",
            parse_mode=parse_mode_html,
            disable_web_page_preview=True,
        )
        return

    if action == "approve":
        # Instant callback answer prevents Telegram spinner hang during git/Vercel build
        await _safe_answer(query, text="[CYPRUS] Одобряю и запускаю деплой...")
        status, res = await _post_moderation_async({
            "action": "approve",
            "submissionId": submission_id,
            "adminUserId": caller_id,
        })
        if status == 409:
            await _safe_answer(query, text=f"Уже в обработке или опубликовано ({res.get('status')})", show_alert=True)
            return
        if not res.get("ok"):
            await bot.send_message(chat_id=chat_id, text=f"❌ [CYPRUS] Ошибка публикации {submission_id}: {res.get('error', status)}")
            return

        base_html = getattr(query.message, "text_html", None) or html.escape(getattr(query.message, "text", "") or "")
        entity_id = html.escape(res.get("entityId", ""))
        await query.edit_message_text(
            text=f"{base_html}\n\n✅ <b>[CYPRUS] Одобрено и опубликовано:</b> <code>{entity_id}</code>",
            parse_mode=parse_mode_html,
            disable_web_page_preview=True,
        )

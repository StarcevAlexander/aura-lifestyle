# Инструкция по настройке EmailJS

EmailJS — сервис для отправки писем прямо из браузера без бэкенда.
Сайт: https://www.emailjs.com

---

## Шаг 1 — Регистрация аккаунта

1. Перейдите на https://www.emailjs.com
2. Нажмите **Sign Up**
3. Введите email и пароль (или войдите через Google/GitHub)
4. Подтвердите email — придёт письмо на указанный ящик

---

## Шаг 2 — Подключение почтового сервиса (Service ID)

### Вариант A — Gmail (текущий, уже подключён)

> Service ID: `aitqdmtakuvolgjp`
> Письма уходят на: `aurarelocationlifestyle@gmail.com`

---

### Вариант B — Privatemail (Custom SMTP) ← добавить

Privatemail не поддерживает OAuth, поэтому подключается через **Custom SMTP**.

**Данные для подключения:**

| Поле            | Значение                   |
|-----------------|----------------------------|
| SMTP Host       | `mail.privateemail.com`    |
| SMTP Port       | `587` (TLS / STARTTLS)     |
| Username        | ваш адрес, например `info@amaniom.com` |
| Password        | пароль от этого ящика      |
| From Name       | `AMANI Oman`               |
| From Email      | `info@amaniom.com`         |

**Пошаговая инструкция:**

1. В EmailJS перейдите в **Email Services** → **Add New Service**
2. Выберите **Custom SMTP** (в самом низу списка)
3. Заполните поля из таблицы выше
4. Нажмите **Test Connection** — должно появиться `Connected`
5. Нажмите **Add Service**
6. Скопируйте новый **Service ID** — он понадобится в следующем шаге

> После получения нового Service ID — замените значение `serviceId` в файлах
> `src/environments/environment.ts` и `src/environments/environment.prod.ts`

---

## Шаг 3 — Создание шаблона письма (Template ID)

1. Перейдите в раздел **Email Templates**
2. Нажмите **Create New Template**
3. Настройте заголовочные поля:
   - **To Email** — `{{to_email}}`
   - **To Name** — `AMANI`
   - **From Name** — `AMANI Website`
   - **Reply To** — оставьте пустым (или `{{reply_to}}` если добавите поле email в форму)
   - **Subject** — `New inquiry: {{subject}}`
4. Переключитесь на вкладку **Code editor** (кнопка `</>` в правом верхнем углу редактора)
5. Вставьте HTML-шаблон из раздела ниже целиком
6. Нажмите **Save**
7. Скопируйте **Template ID**

> Текущий Template ID: `template_amtn39c`

---

## HTML-шаблон письма

Вставить в EmailJS → Email Templates → Code editor:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New inquiry — AMANI</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F0EB;font-family:'Georgia',serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0EB;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background-color:#1A1612;border-radius:10px 10px 0 0;padding:36px 40px 28px;text-align:center;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:4px;color:#C9A96E;text-transform:uppercase;font-family:Arial,sans-serif;">Dar Amani Business Solutions</p>
              <h1 style="margin:0;font-size:32px;letter-spacing:8px;color:#F0D090;font-family:'Georgia',serif;font-weight:400;">AMANI</h1>
              <div style="margin:16px auto 0;width:48px;height:1px;background:linear-gradient(90deg,transparent,#C9A96E,transparent);"></div>
            </td>
          </tr>

          <!-- Tag line -->
          <tr>
            <td style="background-color:#231E18;padding:12px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;letter-spacing:3px;color:#9A8060;text-transform:uppercase;font-family:Arial,sans-serif;">New inquiry from amaniom.com</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#FFFFFF;padding:36px 40px;">

              <!-- Subject badge -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background-color:#F5F0EB;border-left:3px solid #C9A96E;padding:12px 18px;border-radius:0 6px 6px 0;">
                    <p style="margin:0 0 2px;font-size:10px;letter-spacing:2px;color:#9A8060;text-transform:uppercase;font-family:Arial,sans-serif;">Service of interest</p>
                    <p style="margin:0;font-size:16px;color:#1A1612;font-family:'Georgia',serif;">{{subject}}</p>
                  </td>
                </tr>
              </table>

              <!-- Fields -->
              <table width="100%" cellpadding="0" cellspacing="0">

                <tr>
                  <td style="padding-bottom:20px;border-bottom:1px solid #EDE8E0;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#9A8060;text-transform:uppercase;font-family:Arial,sans-serif;">Name</p>
                    <p style="margin:0;font-size:15px;color:#2C2420;font-family:'Georgia',serif;">{{from_name}}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 0;border-bottom:1px solid #EDE8E0;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#9A8060;text-transform:uppercase;font-family:Arial,sans-serif;">Phone</p>
                    <p style="margin:0;font-size:15px;color:#2C2420;font-family:'Georgia',serif;">
                      <a href="tel:{{phone}}" style="color:#C9A96E;text-decoration:none;">{{phone}}</a>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 0;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#9A8060;text-transform:uppercase;font-family:Arial,sans-serif;">Message</p>
                    <p style="margin:0;font-size:15px;color:#2C2420;line-height:1.7;font-family:'Georgia',serif;">{{message}}</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F5F0EB;border-radius:0 0 10px 10px;padding:20px 40px;text-align:center;border-top:1px solid #EDE8E0;">
              <p style="margin:0 0 4px;font-size:11px;color:#9A8060;font-family:Arial,sans-serif;">{{date}}</p>
              <p style="margin:0;font-size:11px;color:#B8A898;font-family:Arial,sans-serif;">amaniom.com &nbsp;·&nbsp; info@amaniom.com &nbsp;·&nbsp; +968 77 832 555</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
```

**Переменные шаблона** (все передаются из формы автоматически):

| Переменная    | Что содержит                              |
|---------------|-------------------------------------------|
| `{{subject}}` | Раздел услуги (Relocation / Business / Lifestyle) |
| `{{from_name}}` | Имя клиента                             |
| `{{phone}}`   | Номер телефона                            |
| `{{message}}` | Текст сообщения (необязательное поле)     |
| `{{date}}`    | Дата и время отправки                     |
| `{{to_email}}`| Адрес получателя из `environment.ts`      |

---

## Шаг 4 — Получение Public Key

1. Перейдите в **Account** → **General** (или **API Keys**)
2. Скопируйте **Public Key**

> Текущий Public Key: `uQmFIt74oaYwllH17`

---

## Шаг 5 — Вставить данные в проект

После подключения Privatemail обновите оба файла окружения:

**`src/environments/environment.ts`** (разработка):
```typescript
export const environment = {
  production: false,
  emailjs: {
    publicKey: 'uQmFIt74oaYwllH17',
    serviceId:  'НОВЫЙ_SERVICE_ID',   
    templateId: 'template_amtn39c',
    toEmail:    'info@amaniom.com',
  },
};
```

**`src/environments/environment.prod.ts`** (продакшн):
```typescript
export const environment = {
  production: true,
  emailjs: {
    publicKey: 'uQmFIt74oaYwllH17',
    serviceId:  'НОВЫЙ_SERVICE_ID',   
    templateId: 'template_amtn39c',
    toEmail:    'info@amaniom.com',
  },
};
```

---

## Лимиты бесплатного плана

| Параметр          | Бесплатно |
|-------------------|-----------|
| Писем в месяц     | 200       |
| Email-сервисов    | 2         |
| Шаблонов          | Неограниченно |
| Хранение истории  | 1 день    |

> На бесплатном плане можно держать одновременно **2 сервиса** — Gmail и Privatemail.
> Если Gmail больше не нужен, его можно удалить и освободить слот.

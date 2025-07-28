# 📄 Technical Task – Static Event Page Generator

This project is a static page generator for events and conferences. The application consists of two main parts:

- **Admin Panel** (`/admin/*`)
- **Public Event Pages** (accessible via custom URLs)

---

## 🔐 Admin Panel Capabilities

The Admin Panel allows authorized users to:

1. **Manage Conferences**
2. **Manage Admin Panel Users**
3. **Manage Registered Guests**

---

## 📅 Conferences

A **conference** has:

- **Own properties** (e.g., title, description, date(s), etc.)
- **Related properties** (e.g., blocks, guests)

### ✅ Conference Page Creation

- A conference can be created and assigned to **any non-admin URL**, including root (`/`).
- Each conference has a **page builder** that constructs the public page vertically, block by block.
- There must be a **UI constructor** to add, remove, reorder, and configure blocks.

---

## 🧱 Block Types

Each block has customizable **settings** like `background`, `padding`, `margin`, etc. Available block types:

| Block       | Description                                          |
| ----------- | ---------------------------------------------------- |
| `hero`      | Title, description, and CTA button (scrolls to form) |
| `map`       | Embedded 2GIS map and event date(s)/time(s)          |
| `form`      | Customizable guest registration form                 |
| `credits`   | Sponsors, partners, etc.                             |
| `owners`    | List of organizing persons                           |
| `speakers`  | List of speakers with images, titles                 |
| `countdown` | Countdown timer (see logic below)                    |
| `custom`    | WYISIWIG from mantine                                |

---

## 📝 Registration Form Logic

- Admin should **configure the form** via a constructor with a variety of **input types**.
- Input types include:
  - Text
  - Email
  - Phone (with autocomplete and country selector)
  - Address (country selector with search)
  - Radio buttons
  - Checkboxes
  - Select menus
  - Multiselect, etc.

> Admin sees just field definitions; the guest sees enhanced UI (e.g., country selectors, phone formatters).

Form fields defined here:

- Affect guest-facing form.
- Affect columns in the guest management table.
- Must stay in sync both ways. Changes in one reflect in the other.

---

## ⏳ Countdown Logic

- If multiple event dates exist, the **countdown** only reflects the **first upcoming date**.
- After the date passes, the countdown block becomes **hidden** automatically.

---

## 🖼 Default Conference Template

When creating a new conference:

- The form must be **pre-filled** with a default layout (from a typical DooDoo Dynamic Co Ltd. event).
- This includes **default background images**.
- These images should reside in the **source code** and be deployed **statically** with the app.

---

## 🧑‍💻 Guests Management – `/admin/guests`

- Standard **CRUD table UI** with **virtual scrolling**.
- New Guest Form = same fields as guest-facing form.
- Columns shown = fields configured in form constructor.
- Must support:
  - Add/remove guest fields
  - Export to `.xlsx` and `.csv`

> Modifying guest fields should update the form constructor and vice versa.

---

## 🛠 Admin Users – `/admin/users`

- Standard **CRUD table UI** with **virtual scrolling**
- Basic user management (create, delete, edit users of the admin panel)

---

## 🎟 Guest Experience

- Guest fills out the form → clicks Submit
- Guest sees a confirmation message
- Data is saved appropriately

---

## 🧠 Development Guidelines

---

### 🧰 Tech Stack

- **Frontend**: React + Mantine UI
- **Backend**: Prisma + NESTJS

---

### ✅ Frontend Requirements

- Use **Mantine components and hooks**
- Prefer Mantine layout props (`p={}`, `maw={}`, `bg={}`) over `.module.css`
- Custom components allowed if Mantine lacks suitable options
- Follow **Feature-Sliced Design (FSD)** — split large files, avoid monoliths
- Ignore lint/style errors unless critical
- **Do NOT write tests**

---

### ⚙ Backend Requirements

- Write unit tests for services only. Mock with jest. mock everything that is not directly related to the currently being tested logic.
- After making changes to the public API, run `generate:client` from F:\event-landing\ to update types.
- After editing the Prisma schema:
  - Run `prisma:migrate` from F:\event-landing-backend\ then run `generate:client` from F:\event-landing\
  - Prisma's command line tools can and will ask questions. So ai must interact with terminal and watch it.

---

### Extras

- Any ai allowed to have read only access to the contents of the following files and folders: dist, node_modules, src/api-client, src/generated, .history, .vscode,
- For naming conventions see neighboring files and folders.
- After ai finishes writing the code it should check the resulting files if they comply with fsd patterns. Code borken down to a smaller chunks and files is a must.
- Do not leave comments in the code. Remove comments if you see them.
- If I tasked ai with anything and ai encountered a file where ai see something that doesn't comply with my guidelines, but is irrelivent to the task at hand, ai must add these issues to the currenly being in progress todo list and get back to them by the queue.
- Inline styles for jsx is allowed only for computed css. Otherwise mantine common components props are priority, then %ComponentName%.module.css is an option if custom css is required.
- After ai finish its task, if it involved any changes in \*.ts(x), ai must check them again for potential typescript errors.
- Any UI involving form should use useForm hook from mantine. Validation must be done with zod and zodResolver. And all that must be put in a differen file than the component.
- Props on jsx components should be sorted a-z case insensitive
- Rules in css should be sorted a-z

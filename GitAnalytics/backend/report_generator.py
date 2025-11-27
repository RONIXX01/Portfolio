import os
import subprocess
import chardet
from datetime import datetime
from fpdf import FPDF
from gigachat import GigaChat

GIT_DIR = r"C:/Users/ROMIK/GitHubik"

# ЗАПУСК GIT КОМАНД
def run_git_command(args):
    try:
        raw = subprocess.run(
            ["git", "-C", GIT_DIR] + args,
            capture_output=True
        ).stdout

        enc = chardet.detect(raw)["encoding"] or "utf-8"
        return raw.decode(enc, errors="ignore").strip()

    except Exception as e:
        return f"Ошибка Git: {e}"

def get_last_commit():
    return run_git_command(["log", "-1", "--pretty=%B"])

def get_week_commits_count():
    result = run_git_command(["log", "--since=1 week ago", "--pretty=oneline"])
    if "Ошибка" in result:
        return 0
    if not result.strip():
        return 0
    return len(result.splitlines())

# РАСЧЕТ KPI
def calculate_simple_kpi(week_commits):

    if week_commits >= 10:
        return {"score": "Высокий", "percentage": 100, "commits": week_commits}
    elif week_commits >= 5:
        return {"score": "Средний", "percentage": 65, "commits": week_commits}
    elif week_commits >= 1:
        return {"score": "Низкий", "percentage": 30, "commits": week_commits}
    else:
        return {"score": "Критический", "percentage": 0, "commits": week_commits}

# GIGACHAT
def generate_ai_text(last_commit, week_count):
    client = GigaChat(
        credentials="MDE5YTliZTgtMzYwMy03MTk1LThhNDYtYmFhZDBjOGY4M2ZjOjcwN2MzMzZlLTQ1YmQtNDJhMi04ODg2LTk1MTQxNDRiNjAwMQ==",
        scope="GIGACHAT_API_PERS",
        verify_ssl_certs=False,
        verbose=False
    )

    prompt = f"""
Сгенерируй аналитический отчёт о состоянии проекта.

Последний коммит:
{last_commit}

Количество коммитов за 7 дней: {week_count}

Сделай выводы о прогрессе, рисках и активности команды. Пиши кратко, по делу.
"""

    response = client.chat(prompt)
    return response.choices[0].message.content

# СОЗДАНИЕ PDF
class PDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 16)
        self.cell(0, 10, "PROJECT REPORT", new_x="LMARGIN", new_y="NEXT")
        self.set_font("Helvetica", "", 12)
        self.cell(0, 10,
                  f"Generated: {datetime.now().strftime('%d.%m.%Y %H:%M')}",
                  new_x="LMARGIN", new_y="NEXT")

def save_pdf(text):
    pdf = PDF()
    pdf.add_page()

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    FONT_PATH = os.path.join(BASE_DIR, "DejaVuSans.ttf")

    pdf.add_font("DejaVu", "", FONT_PATH)
    pdf.set_font("DejaVu", "", 12)

    pdf.multi_cell(0, 8, text)

    filename = os.path.join(BASE_DIR, "report.pdf")
    pdf.output(filename)

    return filename

def main():
    last_commit = get_last_commit()
    week_count = get_week_commits_count()
    kpi = calculate_simple_kpi(week_count)
    ai_text = generate_ai_text(last_commit, week_count)

    report = f"""
ОТЧЁТ О ПРОЕКТЕ
Дата: {datetime.now().strftime('%d.%m.%Y %H:%M')}

ПРОСТОЙ KPI:
├─ Коммитов за неделю: {kpi['commits']}
├─ Уровень KPI: {kpi['score']}
└─ Производительность: {kpi['percentage']}%

Последний коммит:
{last_commit}

АНАЛИТИКА ИИ:
{ai_text}
"""

    return save_pdf(report)


if __name__ == "__main__":
    main()

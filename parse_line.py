import re
import csv

def parse_line_export(txt_path, csv_path):
    url_pattern = re.compile(r'https?://\S+')
    msg_pattern = re.compile(r'^(\d{1,3}:\d{2})\s+(\S+)(?:\s+(.*))?')
    date_pattern = re.compile(r'^\d{4}\.\d{2}\.\d{2}')

    with open(txt_path, encoding='utf-8') as f:
        lines = [l.rstrip('\n') for l in f.readlines()]

    records = []
    current_date = ''

    # Parse into structured messages first
    messages = []  # (date, time, sender, text)
    i = 0
    while i < len(lines):
        line = lines[i]
        if date_pattern.match(line):
            current_date = line.strip()
            i += 1
            continue
        m = msg_pattern.match(line)
        if m:
            t, sender, text = m.group(1), m.group(2), m.group(3) or ''
            # Collect continuation lines (no timestamp, no date)
            j = i + 1
            while j < len(lines):
                next_line = lines[j]
                if not next_line.strip():
                    j += 1
                    break
                if msg_pattern.match(next_line) or date_pattern.match(next_line):
                    break
                text += '\n' + next_line
                j += 1
            messages.append((current_date, t, sender, text.strip()))
            i = j
        else:
            i += 1

    # Category rules: (大類, keywords)
    category_rules = [
        ('旅遊-日本', ['日本', '名古屋', '大阪', '東京', '京都', '福岡', '沖繩', '關西', '四國', '貴船', '換乘', 'jins', '住宿', '獨旅', '出發前']),
        ('旅遊-台灣', ['台南', '台東', '高雄', '嘉義', '台灣']),
        ('旅遊-韓國', ['韓國', '首爾', '釜山', '聖水洞']),
        ('AI工具',   ['ai', 'claude', 'chatgpt', 'gpt', 'firecrawl', '爬蟲', '生圖', '提示詞', 'skill', '讀網頁', '讀影片', 'open skide', 'open slide', 'power bi']),
        ('日文學習', ['日文', '日語', '日檢', '背單字', '換乘', 'nhk', '助詞', '文法', '閱讀']),
        ('筆記工具', ['notion', 'obsidian', 'obisidian', 'ppt', '排版', '國圖']),
        ('美妝保養', ['睫毛', '唇膏', '雙眼皮', '美妝', '貼紙', '轉印']),
        ('程式開發', ['github', 'skill寫法', 'claude skill', 'claude排版', '程式', 'vercel', 'open-slide']),
        ('健身運動', ['hitt', 'hiit', '訓練', '運動']),
        ('娛樂創作', ['同人', '論壇', '反應器', '虎爸爸', 'marvel', 'ptt']),
        ('日文學習', ['sigure.tw', 'learn-japanese']),  # URL-based fallback
        ('其他',     []),
    ]

    def categorize(tag, url):
        text_lower = (tag + ' ' + url).lower()
        for cat, keywords in category_rules:
            if cat == '其他':
                return '其他'
            for kw in keywords:
                if kw.lower() in text_lower:
                    return cat
        return '其他'

    # Extract URL entries
    for date, time_, sender, text in messages:
        urls = url_pattern.findall(text)
        if not urls:
            continue
        # Remove URLs from text to get the tag/label
        tag = url_pattern.sub('', text).strip().strip('\n').strip()
        # Clean up extra whitespace
        tag = re.sub(r'\s+', ' ', tag).strip()
        for url in urls:
            records.append({
                '日期': date,
                '時間': time_,
                '傳送者': sender,
                '大類': categorize(tag, url),
                '標籤': tag,
                '網址': url,
            })

    with open(csv_path, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=['日期', '時間', '傳送者', '大類', '標籤', '網址'])
        writer.writeheader()
        writer.writerows(records)

    print(f"完成！共整理 {len(records)} 筆有網址的訊息 → {csv_path}")

parse_line_export(
    '/root/.claude/uploads/f56d57d4-3e29-5d05-b0a5-3de3c5d9670a/e0bd49ba-LINE___.txt',
    '/home/user/niku0000/line_links.csv'
)

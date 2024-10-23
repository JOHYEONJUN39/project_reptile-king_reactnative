const days: string[] = ['日', '月', '火', '水', '木', '金', '土']

export default function getDeliveryDay (): string {
  const day: number = new Date().getDay()
  const nextDay: string = days[(day + 1) % 7]
  const dayAfterNext: string = days[(day + 2) % 7]
  return `${nextDay}/${dayAfterNext}`
}

// 1. daysというstring[]型の変数を宣言し、曜日を入れる。
// 2. getDeliveryDay関数を宣言し、返り値の型をstringに設定する。
// 3. 現在の曜日を取得してday変数に入れる。
// 4. 翌日の曜日をnextDay変数に入れる。
// 5. 明後日の曜日をdayAfterNext変数に入れる。
// 6. nextDay/dayAfterNextを返す。

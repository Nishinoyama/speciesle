export class Species {
  constructor(
    private _speciesName: string,
    private _stats: number[],
  ) {
  }

  stats(): number[] {
    return this._stats
  }

  name() {
    return this._speciesName
  }

  statsString(): string {
    return this._stats.join("-")
  }

  statsSum(): number {
    return this.stats().reduce((l, r) => l + r, 0)
  }
}

export interface DistanceSpecies<T extends Species> {
  distanceNorm: (lhd: T, rhd: T) => number
  distanceForeach: (lhd: T, rhd: T) => number[]
}

export const defaultDistanceSpecies: DistanceSpecies<Species> = {
  distanceForeach: (lhd, rhd) => {
    return Array.from(lhd.stats().map((le, i) => Math.abs(le - rhd.stats()[i])))
  },
  distanceNorm: (lhd, rhd) => {
    return Math.sqrt(
      lhd.stats().map((le, i) => Math.pow(le - rhd.stats()[i], 2)).reduce((l, r) => l + r, 0)
    )
  },
}

const speciesMapNative = new Map<string, number[]>([
  ["フシギダネ", [45, 49, 49, 65, 65, 45]],
  ["フシギソウ", [60, 62, 63, 80, 80, 60]],
  ["フシギバナ", [80, 82, 83, 100, 100, 80]],
  ["ヒトカゲ", [39, 52, 43, 60, 50, 65]],
  ["リザード", [58, 64, 58, 80, 65, 80]],
  ["リザードン", [78, 84, 78, 109, 85, 100]],
  ["ゼニガメ", [44, 48, 65, 50, 64, 43]],
  ["カメール", [59, 63, 80, 65, 80, 58]],
  ["カメックス", [79, 83, 100, 85, 105, 78]],
  ["キャタピー", [45, 30, 35, 20, 20, 45]],
  ["トランセル", [50, 20, 55, 25, 25, 30]],
  ["バタフリー", [60, 45, 50, 90, 80, 70]],
  ["ビードル", [40, 35, 30, 20, 20, 50]],
  ["コクーン", [45, 25, 50, 25, 25, 35]],
  ["スピアー", [65, 90, 40, 45, 80, 75]],
  ["ポッポ", [40, 45, 40, 35, 35, 56]],
  ["ピジョン", [63, 60, 55, 50, 50, 71]],
  ["ピジョット", [83, 80, 75, 70, 70, 101]],
  ["コラッタ", [30, 56, 35, 25, 35, 72]],
  ["ラッタ", [55, 81, 60, 50, 70, 97]],
  ["オニスズメ", [40, 60, 30, 31, 31, 70]],
  ["オニドリル", [65, 90, 65, 61, 61, 100]],
  ["アーボ", [35, 60, 44, 40, 54, 55]],
  ["アーボック", [60, 95, 69, 65, 79, 80]],
  ["ピカチュウ", [35, 55, 40, 50, 50, 90]],
  ["ライチュウ", [60, 90, 55, 90, 80, 110]],
  ["サンド", [50, 75, 85, 20, 30, 40]],
  ["サンドパン", [75, 100, 110, 45, 55, 65]],
  ["ニドラン♀", [55, 47, 52, 40, 40, 41]],
  ["ニドリーナ", [70, 62, 67, 55, 55, 56]],
  ["ニドクイン", [90, 92, 87, 75, 85, 76]],
  ["ニドラン♂", [46, 57, 40, 40, 40, 50]],
  ["ニドリーノ", [61, 72, 57, 55, 55, 65]],
  ["ニドキング", [81, 102, 77, 85, 75, 85]],
  ["ピッピ", [70, 45, 48, 60, 65, 35]],
  ["ピクシー", [95, 70, 73, 95, 90, 60]],
  ["ロコン", [38, 41, 40, 50, 65, 65]],
  ["キュウコン", [73, 76, 75, 81, 100, 100]],
  ["プリン", [115, 45, 20, 45, 25, 20]],
  ["プクリン", [140, 70, 45, 85, 50, 45]],
  ["ズバット", [40, 45, 35, 30, 40, 55]],
  ["ゴルバット", [75, 80, 70, 65, 75, 90]],
  ["ナゾノクサ", [45, 50, 55, 75, 65, 30]],
  ["クサイハナ", [60, 65, 70, 85, 75, 40]],
  ["ラフレシア", [75, 80, 85, 110, 90, 50]],
  ["パラス", [35, 70, 55, 45, 55, 25]],
  ["パラセクト", [60, 95, 80, 60, 80, 30]],
  ["コンパン", [60, 55, 50, 40, 55, 45]],
  ["モルフォン", [70, 65, 60, 90, 75, 90]],
  ["ディグダ", [10, 55, 25, 35, 45, 95]],
  ["ダグトリオ", [35, 100, 50, 50, 70, 120]],
  ["ニャース", [40, 45, 35, 40, 40, 90]],
  ["ペルシアン", [65, 70, 60, 65, 65, 115]],
  ["コダック", [50, 52, 48, 65, 50, 55]],
  ["ゴルダック", [80, 82, 78, 95, 80, 85]],
  ["マンキー", [40, 80, 35, 35, 45, 70]],
  ["オコリザル", [65, 105, 60, 60, 70, 95]],
  ["ガーディ", [55, 70, 45, 70, 50, 60]],
  ["ウインディ", [90, 110, 80, 100, 80, 95]],
  ["ニョロモ", [40, 50, 40, 40, 40, 90]],
  ["ニョロゾ", [65, 65, 65, 50, 50, 90]],
  ["ニョロボン", [90, 95, 95, 70, 90, 70]],
  ["ケーシィ", [25, 20, 15, 105, 55, 90]],
  ["ユンゲラー", [40, 35, 30, 120, 70, 105]],
  ["フーディン", [55, 50, 45, 135, 95, 120]],
  ["ワンリキー", [70, 80, 50, 35, 35, 35]],
  ["ゴーリキー", [80, 100, 70, 50, 60, 45]],
  ["カイリキー", [90, 130, 80, 65, 85, 55]],
  ["マダツボミ", [50, 75, 35, 70, 30, 40]],
  ["ウツドン", [65, 90, 50, 85, 45, 55]],
  ["ウツボット", [80, 105, 65, 100, 70, 70]],
  ["メノクラゲ", [40, 40, 35, 50, 100, 70]],
  ["ドククラゲ", [80, 70, 65, 80, 120, 100]],
  ["イシツブテ", [40, 80, 100, 30, 30, 20]],
  ["ゴローン", [55, 95, 115, 45, 45, 35]],
  ["ゴローニャ", [80, 120, 130, 55, 65, 45]],
  ["ポニータ", [50, 85, 55, 65, 65, 90]],
  ["ギャロップ", [65, 100, 70, 80, 80, 105]],
  ["ヤドン", [90, 65, 65, 40, 40, 15]],
  ["ヤドラン", [95, 75, 110, 100, 80, 30]],
  ["コイル", [25, 35, 70, 95, 55, 45]],
  ["レアコイル", [50, 60, 95, 120, 70, 70]],
  ["カモネギ", [52, 90, 55, 58, 62, 60]],
  ["ドードー", [35, 85, 45, 35, 35, 75]],
  ["ドードリオ", [60, 110, 70, 60, 60, 110]],
  ["パウワウ", [65, 45, 55, 45, 70, 45]],
  ["ジュゴン", [90, 70, 80, 70, 95, 70]],
  ["ベトベター", [80, 80, 50, 40, 50, 25]],
  ["ベトベトン", [105, 105, 75, 65, 100, 50]],
  ["シェルダー", [30, 65, 100, 45, 25, 40]],
  ["パルシェン", [50, 95, 180, 85, 45, 70]],
  ["ゴース", [30, 35, 30, 100, 35, 80]],
  ["ゴースト", [45, 50, 45, 115, 55, 95]],
  ["ゲンガー", [60, 65, 60, 130, 75, 110]],
  ["イワーク", [35, 45, 160, 30, 45, 70]],
  ["スリープ", [60, 48, 45, 43, 90, 42]],
  ["スリーパー", [85, 73, 70, 73, 115, 67]],
  ["クラブ", [30, 105, 90, 25, 25, 50]],
  ["キングラー", [55, 130, 115, 50, 50, 75]],
  ["ビリリダマ", [40, 30, 50, 55, 55, 100]],
  ["マルマイン", [60, 50, 70, 80, 80, 150]],
  ["タマタマ", [60, 40, 80, 60, 45, 40]],
  ["ナッシー", [95, 95, 85, 125, 75, 55]],
  ["カラカラ", [50, 50, 95, 40, 50, 35]],
  ["ガラガラ", [60, 80, 110, 50, 80, 45]],
  ["サワムラー", [50, 120, 53, 35, 110, 87]],
  ["エビワラー", [50, 105, 79, 35, 110, 76]],
  ["ベロリンガ", [90, 55, 75, 60, 75, 30]],
  ["ドガース", [40, 65, 95, 60, 45, 35]],
  ["マタドガス", [65, 90, 120, 85, 70, 60]],
  ["サイホーン", [80, 85, 95, 30, 30, 25]],
  ["サイドン", [105, 130, 120, 45, 45, 40]],
  ["ラッキー", [250, 5, 5, 35, 105, 50]],
  ["モンジャラ", [65, 55, 115, 100, 40, 60]],
  ["ガルーラ", [105, 95, 80, 40, 80, 90]],
  ["タッツー", [30, 40, 70, 70, 25, 60]],
  ["シードラ", [55, 65, 95, 95, 45, 85]],
  ["トサキント", [45, 67, 60, 35, 50, 63]],
  ["アズマオウ", [80, 92, 65, 65, 80, 68]],
  ["ヒトデマン", [30, 45, 55, 70, 55, 85]],
  ["スターミー", [60, 75, 85, 100, 85, 115]],
  ["バリヤード", [40, 45, 65, 100, 120, 90]],
  ["ストライク", [70, 110, 80, 55, 80, 105]],
  ["ルージュラ", [65, 50, 35, 115, 95, 95]],
  ["エレブー", [65, 83, 57, 95, 85, 105]],
  ["ブーバー", [65, 95, 57, 100, 85, 93]],
  ["カイロス", [65, 125, 100, 55, 70, 85]],
  ["ケンタロス", [75, 100, 95, 40, 70, 110]],
  ["コイキング", [20, 10, 55, 15, 20, 80]],
  ["ギャラドス", [95, 125, 79, 60, 100, 81]],
  ["ラプラス", [130, 85, 80, 85, 95, 60]],
  ["メタモン", [48, 48, 48, 48, 48, 48]],
  ["イーブイ", [55, 55, 50, 45, 65, 55]],
  ["シャワーズ", [130, 65, 60, 110, 95, 65]],
  ["サンダース", [65, 65, 60, 110, 95, 130]],
  ["ブースター", [65, 130, 60, 95, 110, 65]],
  ["ポリゴン", [65, 60, 70, 85, 75, 40]],
  ["オムナイト", [35, 40, 100, 90, 55, 35]],
  ["オムスター", [70, 60, 125, 115, 70, 55]],
  ["カブト", [30, 80, 90, 55, 45, 55]],
  ["カブトプス", [60, 115, 105, 65, 70, 80]],
  ["プテラ", [80, 105, 65, 60, 75, 130]],
  ["カビゴン", [160, 110, 65, 65, 110, 30]],
  ["フリーザー", [90, 85, 100, 95, 125, 85]],
  ["サンダー", [90, 90, 85, 125, 90, 100]],
  ["ファイヤー", [90, 100, 90, 125, 85, 90]],
  ["ミニリュウ", [41, 64, 45, 50, 50, 50]],
  ["ハクリュー", [61, 84, 65, 70, 70, 70]],
  ["カイリュー", [91, 134, 95, 100, 100, 80]],
  ["ミュウツー", [106, 110, 90, 154, 90, 130]],
  ["ミュウ", [100, 100, 100, 100, 100, 100]],
  ["チコリータ", [45, 49, 65, 49, 65, 45]],
  ["ベイリーフ", [60, 62, 80, 63, 80, 60]],
  ["メガニウム", [80, 82, 100, 83, 100, 80]],
  ["ヒノアラシ", [39, 52, 43, 60, 50, 65]],
  ["マグマラシ", [58, 64, 58, 80, 65, 80]],
  ["バクフーン", [78, 84, 78, 109, 85, 100]],
  ["ワニノコ", [50, 65, 64, 44, 48, 43]],
  ["アリゲイツ", [65, 80, 80, 59, 63, 58]],
  ["オーダイル", [85, 105, 100, 79, 83, 78]],
  ["オタチ", [35, 46, 34, 35, 45, 20]],
  ["オオタチ", [85, 76, 64, 45, 55, 90]],
  ["ホーホー", [60, 30, 30, 36, 56, 50]],
  ["ヨルノズク", [100, 50, 50, 86, 96, 70]],
  ["レディバ", [40, 20, 30, 40, 80, 55]],
  ["レディアン", [55, 35, 50, 55, 110, 85]],
  ["イトマル", [40, 60, 40, 40, 40, 30]],
  ["アリアドス", [70, 90, 70, 60, 70, 40]],
  ["クロバット", [85, 90, 80, 70, 80, 130]],
  ["チョンチー", [75, 38, 38, 56, 56, 67]],
  ["ランターン", [125, 58, 58, 76, 76, 67]],
  ["ピチュー", [20, 40, 15, 35, 35, 60]],
  ["ピィ", [50, 25, 28, 45, 55, 15]],
  ["ププリン", [90, 30, 15, 40, 20, 15]],
  ["トゲピー", [35, 20, 65, 40, 65, 20]],
  ["トゲチック", [55, 40, 85, 80, 105, 40]],
  ["ネイティ", [40, 50, 45, 70, 45, 70]],
  ["ネイティオ", [65, 75, 70, 95, 70, 95]],
  ["メリープ", [55, 40, 40, 65, 45, 35]],
  ["モココ", [70, 55, 55, 80, 60, 45]],
  ["デンリュウ", [90, 75, 85, 115, 90, 55]],
  ["キレイハナ", [75, 80, 95, 90, 100, 50]],
  ["マリル", [70, 20, 50, 20, 50, 40]],
  ["マリルリ", [100, 50, 80, 60, 80, 50]],
  ["ウソッキー", [70, 100, 115, 30, 65, 30]],
  ["ニョロトノ", [90, 75, 75, 90, 100, 70]],
  ["ハネッコ", [35, 35, 40, 35, 55, 50]],
  ["ポポッコ", [55, 45, 50, 45, 65, 80]],
  ["ワタッコ", [75, 55, 70, 55, 95, 110]],
  ["エイパム", [55, 70, 55, 40, 55, 85]],
  ["ヒマナッツ", [30, 30, 30, 30, 30, 30]],
  ["キマワリ", [75, 75, 55, 105, 85, 30]],
  ["ヤンヤンマ", [65, 65, 45, 75, 45, 95]],
  ["ウパー", [55, 45, 45, 25, 25, 15]],
  ["ヌオー", [95, 85, 85, 65, 65, 35]],
  ["エーフィ", [65, 65, 60, 130, 95, 110]],
  ["ブラッキー", [95, 65, 110, 60, 130, 65]],
  ["ヤミカラス", [60, 85, 42, 85, 42, 91]],
  ["ヤドキング", [95, 75, 80, 100, 110, 30]],
  ["ムウマ", [60, 60, 60, 85, 85, 85]],
  ["アンノーン", [48, 72, 48, 72, 48, 48]],
  ["ソーナンス", [190, 33, 58, 33, 58, 33]],
  ["キリンリキ", [70, 80, 65, 90, 65, 85]],
  ["クヌギダマ", [50, 65, 90, 35, 35, 15]],
  ["フォレトス", [75, 90, 140, 60, 60, 40]],
  ["ノコッチ", [100, 70, 70, 65, 65, 45]],
  ["グライガー", [65, 75, 105, 35, 65, 85]],
  ["ハガネール", [75, 85, 200, 55, 65, 30]],
  ["ブルー", [60, 80, 50, 40, 40, 30]],
  ["グランブル", [90, 120, 75, 60, 60, 45]],
  ["ハリーセン", [65, 95, 85, 55, 55, 85]],
  ["ハッサム", [70, 130, 100, 55, 80, 65]],
  ["ツボツボ", [20, 10, 230, 10, 230, 5]],
  ["ヘラクロス", [80, 125, 75, 40, 95, 85]],
  ["ニューラ", [55, 95, 55, 35, 75, 115]],
  ["ヒメグマ", [60, 80, 50, 50, 50, 40]],
  ["リングマ", [90, 130, 75, 75, 75, 55]],
  ["マグマッグ", [40, 40, 40, 70, 40, 20]],
  ["マグカルゴ", [60, 50, 120, 90, 80, 30]],
  ["ウリムー", [50, 50, 40, 30, 30, 50]],
  ["イノムー", [100, 100, 80, 60, 60, 50]],
  ["サニーゴ", [65, 55, 95, 65, 95, 35]],
  ["テッポウオ", [35, 65, 35, 65, 35, 65]],
  ["オクタン", [75, 105, 75, 105, 75, 45]],
  ["デリバード", [45, 55, 45, 65, 45, 75]],
  ["マンタイン", [85, 40, 70, 80, 140, 70]],
  ["エアームド", [65, 80, 140, 40, 70, 70]],
  ["デルビル", [45, 60, 30, 80, 50, 65]],
  ["ヘルガー", [75, 90, 50, 110, 80, 95]],
  ["キングドラ", [75, 95, 95, 95, 95, 85]],
  ["ゴマゾウ", [90, 60, 60, 40, 40, 40]],
  ["ドンファン", [90, 120, 120, 60, 60, 50]],
  ["ポリゴン２", [85, 80, 90, 105, 95, 60]],
  ["オドシシ", [73, 95, 62, 85, 65, 85]],
  ["ドーブル", [55, 20, 35, 20, 45, 75]],
  ["バルキー", [35, 35, 35, 35, 35, 35]],
  ["カポエラー", [50, 95, 95, 35, 110, 70]],
  ["ムチュール", [45, 30, 15, 85, 65, 65]],
  ["エレキッド", [45, 63, 37, 65, 55, 95]],
  ["ブビィ", [45, 75, 37, 70, 55, 83]],
  ["ミルタンク", [95, 80, 105, 40, 70, 100]],
  ["ハピナス", [255, 10, 10, 75, 135, 55]],
  ["ライコウ", [90, 85, 75, 115, 100, 115]],
  ["エンテイ", [115, 115, 85, 90, 75, 100]],
  ["スイクン", [100, 75, 115, 90, 115, 85]],
  ["ヨーギラス", [50, 64, 50, 45, 50, 41]],
  ["サナギラス", [70, 84, 70, 65, 70, 51]],
  ["バンギラス", [100, 134, 110, 95, 100, 61]],
  ["ルギア", [106, 90, 130, 90, 154, 110]],
  ["ホウオウ", [106, 130, 90, 110, 154, 90]],
  ["セレビィ", [100, 100, 100, 100, 100, 100]],
  ["キモリ", [40, 45, 35, 65, 55, 70]],
  ["ジュプトル", [50, 65, 45, 85, 65, 95]],
  ["ジュカイン", [70, 85, 65, 105, 85, 120]],
  ["アチャモ", [45, 60, 40, 70, 50, 45]],
  ["ワカシャモ", [60, 85, 60, 85, 60, 55]],
  ["バシャーモ", [80, 120, 70, 110, 70, 80]],
  ["ミズゴロウ", [50, 70, 50, 50, 50, 40]],
  ["ヌマクロー", [70, 85, 70, 60, 70, 50]],
  ["ラグラージ", [100, 110, 90, 85, 90, 60]],
  ["ポチエナ", [35, 55, 35, 30, 30, 35]],
  ["グラエナ", [70, 90, 70, 60, 60, 70]],
  ["ジグザグマ", [38, 30, 41, 30, 41, 60]],
  ["マッスグマ", [78, 70, 61, 50, 61, 100]],
  ["ケムッソ", [45, 45, 35, 20, 30, 20]],
  ["カラサリス", [50, 35, 55, 25, 25, 15]],
  ["アゲハント", [60, 70, 50, 100, 50, 65]],
  ["マユルド", [50, 35, 55, 25, 25, 15]],
  ["ドクケイル", [60, 50, 70, 50, 90, 65]],
  ["ハスボー", [40, 30, 30, 40, 50, 30]],
  ["ハスブレロ", [60, 50, 50, 60, 70, 50]],
  ["ルンパッパ", [80, 70, 70, 90, 100, 70]],
  ["タネボー", [40, 40, 50, 30, 30, 30]],
  ["コノハナ", [70, 70, 40, 60, 40, 60]],
  ["ダーテング", [90, 100, 60, 90, 60, 80]],
  ["スバメ", [40, 55, 30, 30, 30, 85]],
  ["オオスバメ", [60, 85, 60, 75, 50, 125]],
  ["キャモメ", [40, 30, 30, 55, 30, 85]],
  ["ペリッパー", [60, 50, 100, 95, 70, 65]],
  ["ラルトス", [28, 25, 25, 45, 35, 40]],
  ["キルリア", [38, 35, 35, 65, 55, 50]],
  ["サーナイト", [68, 65, 65, 125, 115, 80]],
  ["アメタマ", [40, 30, 32, 50, 52, 65]],
  ["アメモース", [70, 60, 62, 100, 82, 80]],
  ["キノココ", [60, 40, 60, 40, 60, 35]],
  ["キノガッサ", [60, 130, 80, 60, 60, 70]],
  ["ナマケロ", [60, 60, 60, 35, 35, 30]],
  ["ヤルキモノ", [80, 80, 80, 55, 55, 90]],
  ["ケッキング", [150, 160, 100, 95, 65, 100]],
  ["ツチニン", [31, 45, 90, 30, 30, 40]],
  ["テッカニン", [61, 90, 45, 50, 50, 160]],
  ["ヌケニン", [1, 90, 45, 30, 30, 40]],
  ["ゴニョニョ", [64, 51, 23, 51, 23, 28]],
  ["ドゴーム", [84, 71, 43, 71, 43, 48]],
  ["バクオング", [104, 91, 63, 91, 73, 68]],
  ["マクノシタ", [72, 60, 30, 20, 30, 25]],
  ["ハリテヤマ", [144, 120, 60, 40, 60, 50]],
  ["ルリリ", [50, 20, 40, 20, 40, 20]],
  ["ノズパス", [30, 45, 135, 45, 90, 30]],
  ["エネコ", [50, 45, 45, 35, 35, 50]],
  ["エネコロロ", [70, 65, 65, 55, 55, 90]],
  ["ヤミラミ", [50, 75, 75, 65, 65, 50]],
  ["クチート", [50, 85, 85, 55, 55, 50]],
  ["ココドラ", [50, 70, 100, 40, 40, 30]],
  ["コドラ", [60, 90, 140, 50, 50, 40]],
  ["ボスゴドラ", [70, 110, 180, 60, 60, 50]],
  ["アサナン", [30, 40, 55, 40, 55, 60]],
  ["チャーレム", [60, 60, 75, 60, 75, 80]],
  ["ラクライ", [40, 45, 40, 65, 40, 65]],
  ["ライボルト", [70, 75, 60, 105, 60, 105]],
  ["プラスル", [60, 50, 40, 85, 75, 95]],
  ["マイナン", [60, 40, 50, 75, 85, 95]],
  ["バルビート", [65, 73, 75, 47, 85, 85]],
  ["イルミーゼ", [65, 47, 75, 73, 85, 85]],
  ["ロゼリア", [50, 60, 45, 100, 80, 65]],
  ["ゴクリン", [70, 43, 53, 43, 53, 40]],
  ["マルノーム", [100, 73, 83, 73, 83, 55]],
  ["キバニア", [45, 90, 20, 65, 20, 65]],
  ["サメハダー", [70, 120, 40, 95, 40, 95]],
  ["ホエルコ", [130, 70, 35, 70, 35, 60]],
  ["ホエルオー", [170, 90, 45, 90, 45, 60]],
  ["ドンメル", [60, 60, 40, 65, 45, 35]],
  ["バクーダ", [70, 100, 70, 105, 75, 40]],
  ["コータス", [70, 85, 140, 85, 70, 20]],
  ["バネブー", [60, 25, 35, 70, 80, 60]],
  ["ブーピッグ", [80, 45, 65, 90, 110, 80]],
  ["パッチール", [60, 60, 60, 60, 60, 60]],
  ["ナックラー", [45, 100, 45, 45, 45, 10]],
  ["ビブラーバ", [50, 70, 50, 50, 50, 70]],
  ["フライゴン", [80, 100, 80, 80, 80, 100]],
  ["サボネア", [50, 85, 40, 85, 40, 35]],
  ["ノクタス", [70, 115, 60, 115, 60, 55]],
  ["チルット", [45, 40, 60, 40, 75, 50]],
  ["チルタリス", [75, 70, 90, 70, 105, 80]],
  ["ザングース", [73, 115, 60, 60, 60, 90]],
  ["ハブネーク", [73, 100, 60, 100, 60, 65]],
  ["ルナトーン", [90, 55, 65, 95, 85, 70]],
  ["ソルロック", [90, 95, 85, 55, 65, 70]],
  ["ドジョッチ", [50, 48, 43, 46, 41, 60]],
  ["ナマズン", [110, 78, 73, 76, 71, 60]],
  ["ヘイガニ", [43, 80, 65, 50, 35, 35]],
  ["シザリガー", [63, 120, 85, 90, 55, 55]],
  ["ヤジロン", [40, 40, 55, 40, 70, 55]],
  ["ネンドール", [60, 70, 105, 70, 120, 75]],
  ["リリーラ", [66, 41, 77, 61, 87, 23]],
  ["ユレイドル", [86, 81, 97, 81, 107, 43]],
  ["アノプス", [45, 95, 50, 40, 50, 75]],
  ["アーマルド", [75, 125, 100, 70, 80, 45]],
  ["ヒンバス", [20, 15, 20, 10, 55, 80]],
  ["ミロカロス", [95, 60, 79, 100, 125, 81]],
  ["ポワルン", [70, 70, 70, 70, 70, 70]],
  ["カクレオン", [60, 90, 70, 60, 120, 40]],
  ["カゲボウズ", [44, 75, 35, 63, 33, 45]],
  ["ジュペッタ", [64, 115, 65, 83, 63, 65]],
  ["ヨマワル", [20, 40, 90, 30, 90, 25]],
  ["サマヨール", [40, 70, 130, 60, 130, 25]],
  ["トロピウス", [99, 68, 83, 72, 87, 51]],
  ["チリーン", [75, 50, 80, 95, 90, 65]],
  ["アブソル", [65, 130, 60, 75, 60, 75]],
  ["ソーナノ", [95, 23, 48, 23, 48, 23]],
  ["ユキワラシ", [50, 50, 50, 50, 50, 50]],
  ["オニゴーリ", [80, 80, 80, 80, 80, 80]],
  ["タマザラシ", [70, 40, 50, 55, 50, 25]],
  ["トドグラー", [90, 60, 70, 75, 70, 45]],
  ["トドゼルガ", [110, 80, 90, 95, 90, 65]],
  ["パールル", [35, 64, 85, 74, 55, 32]],
  ["ハンテール", [55, 104, 105, 94, 75, 52]],
  ["サクラビス", [55, 84, 105, 114, 75, 52]],
  ["ジーランス", [100, 90, 130, 45, 65, 55]],
  ["ラブカス", [43, 30, 55, 40, 65, 97]],
  ["タツベイ", [45, 75, 60, 40, 30, 50]],
  ["コモルー", [65, 95, 100, 60, 50, 50]],
  ["ボーマンダ", [95, 135, 80, 110, 80, 100]],
  ["ダンバル", [40, 55, 80, 35, 60, 30]],
  ["メタング", [60, 75, 100, 55, 80, 50]],
  ["メタグロス", [80, 135, 130, 95, 90, 70]],
  ["レジロック", [80, 100, 200, 50, 100, 50]],
  ["レジアイス", [80, 50, 100, 100, 200, 50]],
  ["レジスチル", [80, 75, 150, 75, 150, 50]],
  ["ラティアス", [80, 80, 90, 110, 130, 110]],
  ["ラティオス", [80, 90, 80, 130, 110, 110]],
  ["カイオーガ", [100, 100, 90, 150, 140, 90]],
  ["グラードン", [100, 150, 140, 100, 90, 90]],
  ["レックウザ", [105, 150, 90, 150, 90, 95]],
  ["ジラーチ", [100, 100, 100, 100, 100, 100]],
  ["デオキシス", [50, 150, 50, 150, 50, 150]],
  ["ナエトル", [55, 68, 64, 45, 55, 31]],
  ["ハヤシガメ", [75, 89, 85, 55, 65, 36]],
  ["ドダイトス", [95, 109, 105, 75, 85, 56]],
  ["ヒコザル", [44, 58, 44, 58, 44, 61]],
  ["モウカザル", [64, 78, 52, 78, 52, 81]],
  ["ゴウカザル", [76, 104, 71, 104, 71, 108]],
  ["ポッチャマ", [53, 51, 53, 61, 56, 40]],
  ["ポッタイシ", [64, 66, 68, 81, 76, 50]],
  ["エンペルト", [84, 86, 88, 111, 101, 60]],
  ["ムックル", [40, 55, 30, 30, 30, 60]],
  ["ムクバード", [55, 75, 50, 40, 40, 80]],
  ["ムクホーク", [85, 120, 70, 50, 60, 100]],
  ["ビッパ", [59, 45, 40, 35, 40, 31]],
  ["ビーダル", [79, 85, 60, 55, 60, 71]],
  ["コロボーシ", [37, 25, 41, 25, 41, 25]],
  ["コロトック", [77, 85, 51, 55, 51, 65]],
  ["コリンク", [45, 65, 34, 40, 34, 45]],
  ["ルクシオ", [60, 85, 49, 60, 49, 60]],
  ["レントラー", [80, 120, 79, 95, 79, 70]],
  ["スボミー", [40, 30, 35, 50, 70, 55]],
  ["ロズレイド", [60, 70, 65, 125, 105, 90]],
  ["ズガイドス", [67, 125, 40, 30, 30, 58]],
  ["ラムパルド", [97, 165, 60, 65, 50, 58]],
  ["タテトプス", [30, 42, 118, 42, 88, 30]],
  ["トリデプス", [60, 52, 168, 47, 138, 30]],
  ["ミノムッチ", [40, 29, 45, 29, 45, 36]],
  ["ミノマダム", [60, 59, 85, 79, 105, 36]],
  ["ガーメイル", [70, 94, 50, 94, 50, 66]],
  ["ミツハニー", [30, 30, 42, 30, 42, 70]],
  ["ビークイン", [70, 80, 102, 80, 102, 40]],
  ["パチリス", [60, 45, 70, 45, 90, 95]],
  ["ブイゼル", [55, 65, 35, 60, 30, 85]],
  ["フローゼル", [85, 105, 55, 85, 50, 115]],
  ["チェリンボ", [45, 35, 45, 62, 53, 35]],
  ["チェリム", [70, 60, 70, 87, 78, 85]],
  ["カラナクシ", [76, 48, 48, 57, 62, 34]],
  ["トリトドン", [111, 83, 68, 92, 82, 39]],
  ["エテボース", [75, 100, 66, 60, 66, 115]],
  ["フワンテ", [90, 50, 34, 60, 44, 70]],
  ["フワライド", [150, 80, 44, 90, 54, 80]],
  ["ミミロル", [55, 66, 44, 44, 56, 85]],
  ["ミミロップ", [65, 76, 84, 54, 96, 105]],
  ["ムウマージ", [60, 60, 60, 105, 105, 105]],
  ["ドンカラス", [100, 125, 52, 105, 52, 71]],
  ["ニャルマー", [49, 55, 42, 42, 37, 85]],
  ["ブニャット", [71, 82, 64, 64, 59, 112]],
  ["リーシャン", [45, 30, 50, 65, 50, 45]],
  ["スカンプー", [63, 63, 47, 41, 41, 74]],
  ["スカタンク", [103, 93, 67, 71, 61, 84]],
  ["ドーミラー", [57, 24, 86, 24, 86, 23]],
  ["ドータクン", [67, 89, 116, 79, 116, 33]],
  ["ウソハチ", [50, 80, 95, 10, 45, 10]],
  ["マネネ", [20, 25, 45, 70, 90, 60]],
  ["ピンプク", [100, 5, 5, 15, 65, 30]],
  ["ペラップ", [76, 65, 45, 92, 42, 91]],
  ["ミカルゲ", [50, 92, 108, 92, 108, 35]],
  ["フカマル", [58, 70, 45, 40, 45, 42]],
  ["ガバイト", [68, 90, 65, 50, 55, 82]],
  ["ガブリアス", [108, 130, 95, 80, 85, 102]],
  ["ゴンベ", [135, 85, 40, 40, 85, 5]],
  ["リオル", [40, 70, 40, 35, 40, 60]],
  ["ルカリオ", [70, 110, 70, 115, 70, 90]],
  ["ヒポポタス", [68, 72, 78, 38, 42, 32]],
  ["カバルドン", [108, 112, 118, 68, 72, 47]],
  ["スコルピ", [40, 50, 90, 30, 55, 65]],
  ["ドラピオン", [70, 90, 110, 60, 75, 95]],
  ["グレッグル", [48, 61, 40, 61, 40, 50]],
  ["ドクロッグ", [83, 106, 65, 86, 65, 85]],
  ["マスキッパ", [74, 100, 72, 90, 72, 46]],
  ["ケイコウオ", [49, 49, 56, 49, 61, 66]],
  ["ネオラント", [69, 69, 76, 69, 86, 91]],
  ["タマンタ", [45, 20, 50, 60, 120, 50]],
  ["ユキカブリ", [60, 62, 50, 62, 60, 40]],
  ["ユキノオー", [90, 92, 75, 92, 85, 60]],
  ["マニューラ", [70, 120, 65, 45, 85, 125]],
  ["ジバコイル", [70, 70, 115, 130, 90, 60]],
  ["ベロベルト", [110, 85, 95, 80, 95, 50]],
  ["ドサイドン", [115, 140, 130, 55, 55, 40]],
  ["モジャンボ", [100, 100, 125, 110, 50, 50]],
  ["エレキブル", [75, 123, 67, 95, 85, 95]],
  ["ブーバーン", [75, 95, 67, 125, 95, 83]],
  ["トゲキッス", [85, 50, 95, 120, 115, 80]],
  ["メガヤンマ", [86, 76, 86, 116, 56, 95]],
  ["リーフィア", [65, 110, 130, 60, 65, 95]],
  ["グレイシア", [65, 60, 110, 130, 95, 65]],
  ["グライオン", [75, 95, 125, 45, 75, 95]],
  ["マンムー", [110, 130, 80, 70, 60, 80]],
  ["ポリゴンＺ", [85, 80, 70, 135, 75, 90]],
  ["エルレイド", [68, 125, 65, 65, 115, 80]],
  ["ダイノーズ", [60, 55, 145, 75, 150, 40]],
  ["ヨノワール", [45, 100, 135, 65, 135, 45]],
  ["ユキメノコ", [70, 80, 70, 80, 70, 110]],
  ["ロトム", [50, 50, 77, 95, 77, 91]],
  ["ユクシー", [75, 75, 130, 75, 130, 95]],
  ["エムリット", [80, 105, 105, 105, 105, 80]],
  ["アグノム", [75, 125, 70, 125, 70, 115]],
  ["ディアルガ", [100, 120, 120, 150, 100, 90]],
  ["パルキア", [90, 120, 100, 150, 120, 100]],
  ["ヒードラン", [91, 90, 106, 130, 106, 77]],
  ["レジギガス", [110, 160, 110, 80, 110, 100]],
  ["ギラティナ", [150, 100, 120, 100, 120, 90]],
  ["クレセリア", [120, 70, 120, 75, 130, 85]],
  ["フィオネ", [80, 80, 80, 80, 80, 80]],
  ["マナフィ", [100, 100, 100, 100, 100, 100]],
  ["ダークライ", [70, 90, 90, 135, 90, 125]],
  ["シェイミ", [100, 100, 100, 100, 100, 100]],
  ["アルセウス", [120, 120, 120, 120, 120, 120]],
])

export const speciesNameList = Array.from(speciesMapNative.keys())

export function speciesByName(name: string): Species | undefined {
  name = name.replace(/[ぁ-ん]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 0x60))
  name = name.replace(/^ニドランオス$/, "ニドラン♂")
  name = name.replace(/^ニドランメス$/, "ニドラン♀")
  name = name.replace(/^ポリゴンツー$/, "ポリゴン２")
  name = name.replace(/^ポリゴンゼット$/, "ポリゴンＺ")
  name = name.replace(/^ユイイツオウ$/, "ブースター")
  name = name.replace(/^唯一王$/, "ブースター")
  const stats = speciesMapNative.get(name)
  if (stats === undefined) return undefined
  return new Species(name, stats)
}

export function randomSpecies(): Species {
  const allSpeciesNative = Array.from(speciesMapNative.entries())
  const speciesNative = allSpeciesNative[Math.floor(Math.random() * allSpeciesNative.length)]
  return new Species(
    speciesNative[0],
    speciesNative[1],
  )
}
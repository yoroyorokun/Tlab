# encoding: utf-8
cats = ["アクション","テーブル","ギャンブル","シューティング","格闘","レース","RPG","アドベンチャー","リズム","クイズ","アクションRPG","シミュレーション","パズル","アダルト"]
cats.each do |c|
  Category.create(:name => c)
end

# https://github.com/zdennis/activerecord-import/wiki/Requiring
require "activerecord-import/base"
ActiveRecord::Import.require_adapter('mysql2')

Url.transaction do
	path = "#{APP_ROOT}/db/data/urls"
  # urls = array of arrays OR array of hashes
  urls = File.readlines(path).map do |line|
  	long_url = line.chomp.delete('(),')
  	Url.new(long_url: long_url)
  end

  urls.map do |url|
  	url.run_callbacks(:save) { true }
  end

  columns = [:long_url, :short_url]
  Url.import columns, urls, validate: true
end

# Url.connection.index_exists? :urls, :short_url
# returns true if index exists

# Alternative - faster
# data_string = "INSERT INTO urls (ori_url,short_url,click_count) VALUES "
# values = File.read("urls")
# values = values.tr("();\n",'').split(",").each do |x|
#          data_string << "('" + x.strip + "','" + SecureRandom.hex(7) + "','" + "0'),"
#        end
# data_string.chomp!(",")
# data_string << ";"
# Url.connection.execute(data_string)

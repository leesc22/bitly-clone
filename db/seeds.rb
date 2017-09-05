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

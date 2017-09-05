class AddIndex < ActiveRecord::Migration[5.0]
	def up
		add_index :urls, :short_url, unique: true
	end

	def down
		remove_index :urls, :short_url
	end
end

class AddClickCount < ActiveRecord::Migration[5.0]
	def up
		add_column :urls, :click_count, :integer, :null => false, :default => 0
	end

	def down
		remove_column :urls, :click_count
	end
end

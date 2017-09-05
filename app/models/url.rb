class Url < ActiveRecord::Base
	validates :long_url, presence: true
	validates :long_url, format: { with: URI.regexp }, allow_blank: true
	validates :short_url, uniqueness: true
  before_create :shorten_url
  before_save :shorten_url

	# return a string of random alpha-numeric characters
	def shorten_url
		# generate 7 random numbers from 0-9 and a-z
		self.short_url = rand(36**7).to_s(36) # [0,6] # use this to ensure 7 characters

		# to include A-Z
		# require 'base62'
		# self.short_url = rand(36**7).base62_encode

		# self.short_url = SecureRandom.hex(10)
	end
end

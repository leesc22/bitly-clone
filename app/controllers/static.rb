require 'byebug'

get '/' do
	# Debugging Method 1: Printing to Log
	# puts "[LOG] Getting /"
	# puts "[LOG] Params: #{params.inspect}"
	# Before submit
	# {"captures"=>[]}

	# After submit
	# {"long_url"=>"https://code.nextacademy.com/courses/web-development-bootcamp/lessons/bitly-building-our-first-web-app", "captures"=>[]}

	# let user create new short URL, display a list of shortened URLs
	@urls = Url.all
  erb :"static/index"
end

post '/urls' do 
	# create a new Url
	# byebug
	Url.create(long_url: params['long_url'])
end

# i.e. /g6bda
get '/:short_url' do
	# redirect to appropriate "long" URL
	url = Url.find_by(short_url: params["short_url"])
	url.click_count += 1
	url.save
	redirect url.long_url
end

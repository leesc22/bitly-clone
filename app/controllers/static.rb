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
	@urls = Url.order(:id)
  erb :"static/index"
end

post '/urls' do 
	# create a new Url
	# byebug
	url = Url.create(long_url: params['long_url'])
  if url.invalid?
  	@urls = Url.order(:id)
		@errors = url.errors.messages
  	# erb :"static/index" # commented out for json
		@errors.to_json
  else
	  # redirect "/"	# commented out for json
	  url.to_json
  end
end

# i.e. /g6bda
get '/:short_url' do
	# redirect to appropriate "long" URL
	url = Url.find_by(short_url: params["short_url"])
	url.click_count += 1
	url.save
	redirect url.long_url
end

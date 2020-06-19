class HomepageController < ApplicationController
  def index
    render component: 'Home'
  end
end

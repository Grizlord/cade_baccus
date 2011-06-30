class ApplicationController < ActionController::Base
  helper :layout
  include ControllerAuthentication
  protect_from_forgery
  rescue_from CanCan::AccessDenied do |exception|
    flash[:error] = "Access Denied. So it is written so it shall be done!"
    redirect_to root_url
  end
end

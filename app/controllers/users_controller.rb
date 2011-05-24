class UsersController < ApplicationController
  before_filter :login_required
  load_and_authorize_resource
  
  def index
    @users = User.find(:all)
  end

  def new
  end

  def create
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_url, :notice => "Thank you for signing up! You are now logged in."
    else
      render :action => 'new'
    end
  end

  def edit
  end

  def update
    if @user.update_attributes(params[:user])
      redirect_to root_url, :notice => "Your profile has been updated."
    else
      render :action => 'edit'
    end
  end
  
  def destroy
    @user.destroy
    redirect_to users_url, :notice => "Successfully destroyed user."
  end
end
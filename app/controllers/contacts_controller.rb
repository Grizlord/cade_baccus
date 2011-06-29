class ContactsController < ApplicationController
  before_filter :login_required, :except => [:new, :create]
  load_and_authorize_resource
  
  def index
    @contacts = Contact.all
  end

  def new
  end

  def create
    if @contact.save
      ContactMailer.contact_message(@contact).deliver
      redirect_to root_path, :notice => "Thank you! Your message has been recieved."
    else
      render :action => 'new'
    end
  end
  
  def destroy
    @contact.destroy
    redirect_to contacts_path, :notice => "Successfully destroyed message."
  end
end
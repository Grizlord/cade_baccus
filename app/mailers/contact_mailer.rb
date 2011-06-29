class ContactMailer < ActionMailer::Base
  default :to => "baccus04@gmail.com"
  
  def contact_message(contact)
    @contact = contact
    mail(:from => "#{contact.name} <#{contact.email}>", :subject => contact.subject)
  end
end

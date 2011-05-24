module ApplicationHelper
  def display_date(input_date)
    unless input_date.nil? 
      return input_date.strftime("%B %d %Y")
    end
  end
  
  def display_time(input_time)
    unless input_time.nil? 
      return input_time.strftime("%I:%M%p")
    end
  end
end

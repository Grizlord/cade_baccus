CarrierWave.configure do |config|
  config.root = Rails.root.join('tmp') 
  config.cache_dir = 'carrierwave'
    
  config.s3_access_key_id = 'AKIAJS6XTJRFJOXNY73Q'
  config.s3_secret_access_key = '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'
  config.s3_bucket = 'cadebaccus'
  config.s3_region = 'us-east-1'
end
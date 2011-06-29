CarrierWave.configure do |config|
  config.root = Rails.root.join('tmp') 
  config.cache_dir = 'carrierwave'
    
  config.s3_access_key_id = 'AKIAIXDJ7TSUMXFMMTXQ'
  config.s3_secret_access_key = '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'
  config.s3_bucket = 'cadebaccus01'
  config.s3_region = 'us-east-1'
end
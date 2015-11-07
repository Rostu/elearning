# -*- mode: ruby -*-

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.define 'webserver'

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "ubuntu/precise64"
  config.vm.hostname = 'webserver'
  #minimal needed Ram size is around 1.700mb
  #You can configure the size using virtualbox GUI or by uncommenting the next line
  #config.vm.provider :virtualbox do |vb|
  #            vb.customize ['modifyvm', :id,'--memory', '2048']
  #        end

  config.vm.network "forwarded_port", guest: 3555, host: 3000
  config.vm.network 'forwarded_port', guest: 80, host: 8080

  config.vm.network "private_network", ip: "192.168.33.100"

  config.vm.synced_folder "./", "/home/vagrant/elearning", :nfs => true

  # http://stackoverflow.com/questions/21274437/vagrant-install-chef-client-on-top-of-base-image
  config.omnibus.chef_version = :latest

  config.vm.provision "chef_solo" do |chef|
    #chef.cookbooks_path = ['provisioning/cookbooks']
    chef.json = {
      "java" => {
    	"install_flavor" => "oracle",
    	"jdk_version" => "8",
    	"oracle" => {
      	  "accept_oracle_download_terms" => true
    	}
      }
    }	
    chef.add_recipe 'git'
    chef.add_recipe 'nodejs'
    chef.add_recipe 'mongodb'
    chef.add_recipe 'java' 
    chef.add_recipe 'maven'
  end

  config.vm.provision 'shell' do |chef|
    chef.path = 'provisioning/apache.sh'
    chef.path = 'provisioning/extensions.sh'
  end

end

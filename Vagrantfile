# -*- mode: ruby -*-

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.define 'webserver'

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "ubuntu/precise64"

  config.vm.hostname = 'webserver'

  config.vm.network "forwarded_port", guest: 3555, host: 3000
  config.vm.network 'forwarded_port', guest: 80, host: 8080

  config.vm.network "private_network", ip: "192.168.33.100"

  config.vm.synced_folder "./", "/home/vagrant/elearning", :nfs => true

  # http://stackoverflow.com/questions/21274437/vagrant-install-chef-client-on-top-of-base-image
  config.omnibus.chef_version = :latest

  config.vm.provision "chef_solo" do |chef|
    #chef.cookbooks_path = ['provisioning/cookbooks']

    chef.add_recipe 'git'
    chef.add_recipe 'nodejs'
    chef.add_recipe 'mongodb'
  end

  config.vm.provision 'shell' do |chef|
    chef.path = 'provisioning/apache.sh'
  end

end

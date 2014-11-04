# App

## Staging environment

* Install `Vagrant`: https://www.vagrantup.com/downloads.html
* `sudo aptitude install nfs-kernel-server`
* `vagrant plugin install vagrant-omnibus`
* `vagrant plugin install vagrant-librarian-chef`
* `gem install librarian-chef`

``` bash
$ vagrant box add ubuntu/precise64 https://cloud-images.ubuntu.com/vagrant/precise/current/precise-server-cloudimg-amd64-vagrant-disk1.box
$ vagrant init # edit the Vagrantfile
$ vagrant up
```

## Deployment

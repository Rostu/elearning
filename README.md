# App

## Staging environment

* Install `Vagrant`: https://www.vagrantup.com/downloads.html

* Start the VM.
``` bash
$ sudo aptitude install nfs-kernel-server
$ vagrant plugin install vagrant-omnibus
$ vagrant plugin install vagrant-librarian-chef
$ gem install librarian-chef # only if you want to use Librarian directly
$ vagrant box add ubuntu/precise64 \
$ > https://cloud-images.ubuntu.com/vagrant/precise/current/precise-server-cloudimg-amd64-vagrant-disk1.box
$ # A long operation, downloads the vm image.
$ vagrant up # lasts long, installs all the packages
$ vagrant ssh
```
* In the VM start the node application.
``` bash
$ cd elearning # This folder is shared, same files as in your working directory.
$ npm install # If needed, possible everything is already there.
$ # Configure all the sensitive data if needed.
$ nodejs app.js
```
* You can now access the port `80` (the regular webserver) via
  `http://localhost:8080` and the port `3000` (the node server) via
  `http://localhost:3000`. See `config.js` and `Vagrantfile` if you want to know
  how the port mapping is established. Do *not* start the node app from your
  workstation, only from inside the VM, otherwise you'll get a port collisions
  problem since the VM blocks the port `3000`.

* The task is: rewrite the application in a way that you are happy with it
  under `http://localhost:8080`.


## Deployment

* Start the application in _production_ mode:

``` bash
$ NODE_ENV=production nodejs app.js
```

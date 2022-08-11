vms = {
  'elastic1' => {'memory' => '2048', 'cpus' => 2, 'ip' => '10', 'box' => 'generic/debian10'},
  'elastic2' => {'memory' => '2048', 'cpus' => 2, 'ip' => '11', 'box' => 'generic/debian10'},
  'graylog1' => {'memory' => '2048', 'cpus' => 2, 'ip' => '12', 'box' => 'generic/debian10'},
  'graylog2' => {'memory' => '2048', 'cpus' => 2, 'ip' => '13', 'box' => 'generic/debian10'},
  'graylog3' => {'memory' => '2048', 'cpus' => 2, 'ip' => '14', 'box' => 'generic/debian10'}
}

Vagrant.configure('2') do |config|

  config.vm.box_check_update = false

  vms.each do |name, conf|
    config.vm.define "#{name}" do |k|
      k.vm.box = "#{conf['box']}"
      k.vm.hostname = "#{name}.example.com"
      k.vm.network 'private_network', ip: "172.27.11.#{conf['ip']}" 
      k.vm.provider 'virtualbox' do |vb|
        vb.customize ["modifyvm", :id, "--groups", "/InfraAgil"]
        vb.memory = conf['memory']
        vb.cpus = conf['cpus']
      end
      k.vm.provider 'libvirt' do |lv|
        lv.memory = conf['memory']
        lv.cpus = conf['cpus']
        lv.cputopology :sockets => 1, :cores => conf['cpus'], :threads => '1'
      end
    end
  end
  config.vm.synced_folder "./", "/vagrant", disabled: false
  config.vm.provision 'shell', path: 'provision/provision.sh'
end

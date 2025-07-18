App = {
  web3:null,
  web3Provider: null,
  contracts: {},
  addresses: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC
    if (typeof web3 !== 'undefined') {
     
      if (window.ethereum) {
        App.web3Provider = window.ethereum;
        web3 = new Web3(web3.currentProvider);
        try {
          // 请求用户授权
           window.ethereum.enable();
        } catch (error) {
          // 用户不授权时
          console.error("User denied account access")
        }
      } else{
        App.web3Provider = web3.currentProvider;
      }
      
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.bnbchain.org:8545');
      web3 = new Web3(App.web3Provider);
    }
    App.web3 = web3
    

    return App.initContract();
  },

  initContract: function() {
    console.log(Web3.version);
    let base = new BigNumber(10);
    let exponent = new BigNumber(18);
    let wei = base.pow(exponent)
    App.wei = wei

    $.getJSON('/js/GpcExchange.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var TutorialTokenArtifact = data;
      
      App.contracts.TutorialToken = TruffleContract(TutorialTokenArtifact);

      // Set the provider for our contract.
      App.contracts.TutorialToken.setProvider(App.web3Provider);
      //App.proxyAddress = '0xc65Bee38B5C1B810bB4A18e9f76ED6a26E82c0B7'

      // 1. 准备合约ABI和地址
      let GpcTokenId = "0xD3c304697f63B279cd314F92c19cDBE5E5b1631A";
      let Api = "[{\"inputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"symbol\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"description_\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"website_\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"logoURL_\",\"type\":\"string\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"allowance\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"needed\",\"type\":\"uint256\"}],\"name\":\"ERC20InsufficientAllowance\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"needed\",\"type\":\"uint256\"}],\"name\":\"ERC20InsufficientBalance\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"approver\",\"type\":\"address\"}],\"name\":\"ERC20InvalidApprover\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"receiver\",\"type\":\"address\"}],\"name\":\"ERC20InvalidReceiver\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"}],\"name\":\"ERC20InvalidSender\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"ERC20InvalidSpender\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"OwnableInvalidOwner\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"OwnableUnauthorizedAccount\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"MAX_SUPPLY\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"burn\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"burnFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"depositEth\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"description\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"finish\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"finished\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"logoURL\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"mint\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"website\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"withtrawEth\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]";
      //console.log(web3)
      //let gpc = new web3.eth.Contract(JSON.parse(Api), GpcTokenId);   //链接usdt代币地址
      App.contracts.gpc = TruffleContract({ abi: JSON.parse(Api) });;
      App.contracts.gpc.setProvider(App.web3Provider);
      App.addresses.gpc=GpcTokenId;
      return App.getBalances();
    });
  

    return App.bindEvents();

  },

  bindEvents: function() {
    $(document).on('click', '#transferButton', App.handleTransfer);
    $(document).on('click', '#transferBnbButton', App.handleBnbTransfer);
    $(document).on('click', '#clearButton', App.handleClean);
  },

  handleBnbTransfer:function(event){
    event.preventDefault();
    var amount = parseFloat($('#TTTransferAmount').val());

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      // App.web3.eth.sendTransaction({from: account,
      //   to: App.addresses.constract, // 你的 BSC 地址
      //   value: amount * Math.pow(10,18)+"",}).then(function(result){
      //     return  App.getBalances();
      //   }).catch(function(err) {
      //     console.log(err.message);
      //   });
      console.log(amount * Math.pow(10,18)+"")

      App.contracts.TutorialToken.deployed().then(function(instance) {
      tutorialTokenInstance = instance;
      App.addresses.constract=tutorialTokenInstance.address
      return tutorialTokenInstance.dealReceive({from: account,
        to: App.addresses.constract, // 你的 BSC 地址
        value: amount * Math.pow(10,18)+"",});
    }).then(function(result) {
        alert('入场成功！');
      return  App.getBalances();
    }).catch(function(err) {
      console.log(err.message);
    });
    });
    
    
  },

  handleClean: function(event){
    event.preventDefault();
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
    App.contracts.TutorialToken.deployed().then(function(instance) {
      tutorialTokenInstance = instance;
      App.addresses.constract=tutorialTokenInstance.address
      return tutorialTokenInstance.withdraw({from: account});
    }).then(function(result) {
      return  App.getBalances();
    }).catch(function(err) {
      console.log(err.message);
    });
    }
  },

  handleTransfer: function(event) {
    event.preventDefault();

    var amount = parseInt($('#TTTransferAmount').val());
    //var toAddress = $('#TTTransferAddress').val();

    //console.log('Transfer ' + amount + ' TT to ' + toAddress);

    var tutorialTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      let gpcInstance ;

      App.contracts.gpc.at(App.addresses.gpc).then(function(instance){
        gpcInstance = instance;
        return instance.allowance(account,App.addresses.constract)
      }).then(function(result){
        let allowance= new BigNumber(result).div(App.wei).toFixed(6);
        console.log(allowance);
        return allowance;
      }).then(function(result){
        if(result < amount){
          gpcInstance.approve(App.addresses.constract,"10000000000000000000000000000000000000000000000".toString(),{from: account, gas: 100000}).then(function(){
            App.contracts.TutorialToken.deployed().then(function(instance) {
              tutorialTokenInstance = instance;
      
              return tutorialTokenInstance.depositGpc(App.web3.utils.toWei(amount, "ether").toString(), {from: account});
            }).then(function(result) {
              alert('入场成功！');
              return App.getBalances();
            }).catch(function(err) {
              console.log(err.message);
            });
          })
        }else{
          App.contracts.TutorialToken.deployed().then(function(instance) {
              tutorialTokenInstance = instance;
              //console.log(new BigNumber(amount).multipliedBy(Math.pow(10,18)))
              console.log(App.web3.utils.toWei($('#TTTransferAmount').val(), "ether"))
              return tutorialTokenInstance.depositGpc(App.web3.utils.toWei($('#TTTransferAmount').val(), "ether").toString(), {from: account});
            }).then(function(result) {
              alert('入场成功！');
              return App.getBalances();
            }).catch(function(err) {
              console.log(err.message);
            });
        }

      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getBalances: function() {
    
    console.log('Getting balances...');
    let tutorialTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      $('#userAddress').text(account);

      App.contracts.TutorialToken.deployed().then(function(instance) {
        tutorialTokenInstance = instance;
        App.addresses.constract=tutorialTokenInstance.address
        return tutorialTokenInstance.checkWhiteList(account);
      }).then(function(result) {
        if(!result){
          alert('非GPCDAO用户，禁止访问！')
          return;
        }
      }).catch(function(err) {
        console.log(err.message);
        alert('System error')
        return;
      });


    App.contracts.TutorialToken.deployed().then(function(instance) {
      tutorialTokenInstance = instance;
      return tutorialTokenInstance.totalBalanceValue();
    }).then(function(result) {
      balance1= new BigNumber(result[0]).div(App.wei).toFixed(4);
      balance2= new BigNumber(result[1]).div(App.wei).toFixed(4);
      balance=parseFloat(balance1)+parseFloat(balance2);
      $('#totalValue').text(balance.toFixed(4));
    }).catch(function(err) {
      console.log(err.message);
    });

    
      App.contracts.TutorialToken.deployed().then(function(instance) {
        tutorialTokenInstance = instance;

        return tutorialTokenInstance.userBalanceOf(account);
      }).then(function(result) {
        balance= new BigNumber(result).div(App.wei).toFixed(4);
        $('#userValue').text(balance);
      }).catch(function(err) {
        console.log(err.message);
      });
    
      

    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

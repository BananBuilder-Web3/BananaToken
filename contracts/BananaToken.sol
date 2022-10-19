// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract BananaToken is ERC20Capped, ERC20Burnable {
    address payable public owner;

    //Sets owner, capped amount, initial amount, and block reward on contract creation
    constructor(uint256 cap) ERC20("BananaSwap", "NANA") ERC20Capped(cap * (10 ** decimals())) {
        owner = payable(msg.sender);
        _mint(owner, 1000000 * (10 ** decimals()));
    }

    //_mint function from ERC20Capped, 
    function _mint(address account, uint256 amount) internal virtual override(ERC20Capped, ERC20) {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }

    //destroy contract if Owner
    function destroy() public onlyOwner {
        selfdestruct(owner);
    }

    //Check ot make sure the owner is calling a function
    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
}
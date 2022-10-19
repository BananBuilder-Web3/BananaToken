// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Staking Token (STK)
 * @author Andy Bennett
 * @notice Implements a basic ERC20 staking token with incentive distribution
 */
contract StakingToken is ERC20, Ownable {
    using SafeMath for uint256;

    /**
     * @notice Array of the stakeholders
     */
    address[] internal stakeholders;

    /**
     * @notice the Constructor for the Staking Token.
     * @param _owner the address to receive all tokens on construction
     * @param _supply the amount of tokens to mint on construction
     */
    constructor(address _owner, uint256 _supply) ERC20("BananaSwap", "NANA") {
        _mint(_owner, _supply);
    }

     /**
    * @notice A method to check if an address is a stakeholder.
    * @param _address The address to verify.
    * @return bool, uint256 Whether the address is a stakeholder,
    * and if so its position in the stakeholders array.
    */
   function isStakeholder(address _address) public view returns (bool, uint256) {
    for (uint256 s = 0; s < stakeholders.length; s++) {
        if(_address == stakeholders[s]) return (true, s);
    }
    return (false, 0);
   }

    /**
    * @notice A method to add a stakeholder.
    * @param _stakeholder The stakeholder to add.
    */
}
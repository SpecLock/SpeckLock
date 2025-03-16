// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Escrow {
    struct Deliverable {
        uint256 amount;
        bool completed;
        address payable worker;
    }

    address public owner;
    uint256 public totalCapital;
    uint256 public deliverableCount;
    mapping(uint256 => Deliverable) public deliverables;

    event DeliverableAdded(uint256 indexed deliverableId, uint256 amount, address indexed worker);
    event DeliverableCompleted(uint256 indexed deliverableId, address indexed worker, string proof);
    event DeliverableApproved(uint256 indexed deliverableId, address indexed worker, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(uint256 _totalCapital) payable {
        require(msg.value == _totalCapital, "Sent value must match total capital");
        owner = msg.sender;
        totalCapital = _totalCapital;
    }

    function addDeliverable(uint256 _amount, address payable _worker) external onlyOwner {
        require(_amount <= totalCapital, "Amount exceeds total capital");
        deliverables[deliverableCount] = Deliverable({
            amount: _amount,
            completed: false,
            worker: _worker
        });
        totalCapital -= _amount;
        emit DeliverableAdded(deliverableCount, _amount, _worker);
        deliverableCount++;
    }

    function completeDeliverable(uint256 _deliverableId, string memory _proof) external {
        Deliverable storage deliverable = deliverables[_deliverableId];
        require(msg.sender == deliverable.worker, "Only assigned worker can complete the deliverable");
        require(!deliverable.completed, "Deliverable already completed");
        deliverable.completed = true;
        emit DeliverableCompleted(_deliverableId, msg.sender, _proof);
    }

    function approveDeliverable(uint256 _deliverableId) external onlyOwner {
        Deliverable storage deliverable = deliverables[_deliverableId];
        require(deliverable.completed, "Deliverable not yet completed");
        deliverable.worker.transfer(deliverable.amount);
        emit DeliverableApproved(_deliverableId, deliverable.worker, deliverable.amount);
    }
}
pragma solidity ^0.4.11;

contract UploadLedger {
    // Represents a file uploaded by a user
    struct Upload {
        bytes32 name;  // filename
        bytes32 hash;  // The hash of the uploaded file
        uint size;  // file size in bytes
        uint date;  // Upload time as unix timestamp
        bool is_hidden;  // Boolean to indicate whether the file has been hidden from the ui
    }


    // An array of uploads for each user
    mapping(address => Upload[]) public uploads;

    function UploadLedger() {

    }

    // Record that a file was uploaded
    function upload(bytes32 name, bytes32 hash, uint size) {
        uploads[msg.sender].push(Upload({
            name: name,
            hash: hash,
            size: size,
            date: now,
            is_hidden: false
        }));
    }

    // Hide or unhide a file so that it is ignored in the UI
    function setIsHidden(uint index, bool is_hidden) {
        uploads[msg.sender][index].is_hidden = is_hidden;
    }
}
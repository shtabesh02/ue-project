const AccountInfo = () => {
    return (
        <div className="accountInfo-container">
            <div className="accountInfo-header">Basic Info</div>
            <div className="accountInfo-section">
                <div className="accountInfo-label">Name</div>
                <div className="accountInfo-value"></div>
            </div>
            <div className="accountInfo-section">
                <div className="accountInfo-label">Pronouns</div>
                <div className="accountInfo-value"></div>
            </div>
            <div className="accountInfo-section">
                <div className="accountInfo-label">Phone number</div>
                <div className="accountInfo-value"></div>
            </div>
            <div className="accountInfo-section">
                <div className="accountInfo-label">Email</div>
                <div className="accountInfo-value"></div>
            </div>
        </div>
    );
}

export default AccountInfo;

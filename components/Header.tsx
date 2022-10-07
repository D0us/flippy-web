import { ConnectButton } from "web3uikit"

export const Header = () => {
    return (
        <nav className="p-5 flex flex-row border-b-2">
            <h1 className="py-4 px-4 font-bold text-3xl">Flippy!</h1>
            <div className="ml-auto py-2 px-4">
                <ConnectButton moralisAuth={true} />
            </div>
        </nav>
    )
}

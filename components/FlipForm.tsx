import { Input, Button } from "web3uikit"
import { useMoralis, useWeb3Contract, useMoralisQuery, useMoralisSubscription } from "react-moralis"
import { useEffect, useState } from "react"
import { abi, contractAddresses } from "../constants"
import { ethers, BigNumber, ContractTransaction } from "ethers"

export const FlipForm = () => {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()

    const chainId: string = parseInt(chainIdHex!).toString()
    const flippyAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [coinFaceSelection, setCoinFaceSelection] = useState<CoinFace | undefined>()
    const [minimumWager, setMinimumWager] = useState("0")
    const [wager, setWager] = useState("0")

    enum CoinFace {
        Heads = 0,
        Tails = 1,
    }

    const { runContractFunction: getMinimumWager } = useWeb3Contract({
        contractAddress: flippyAddress,
        abi: abi,
        functionName: "getMinimumWager",
        params: {},
        msgValue: "",
    })

    const { runContractFunction: flipCoin, isFetching } = useWeb3Contract({
        contractAddress: flippyAddress,
        abi: abi,
        functionName: "flipCoin",
        params: { playerCoinFaceSelection: coinFaceSelection },
        msgValue: ethers.utils.parseEther(wager).toString(),
    })

    const { runContractFunction: fireEvent } = useWeb3Contract({
        contractAddress: flippyAddress,
        abi: abi,
        functionName: "fireEvent",
        params: {},
        msgValue: "",
    })

    const updateui = async () => {
        const minimumWagerFromCall = (
            (await getMinimumWager({
                onError: (err) => console.log(err),
            })) as BigNumber
        ).toString()
        setMinimumWager(minimumWagerFromCall)
    }

    const handleFlipCoinSuccess = async (tx: ContractTransaction) => {
        await tx.wait(1).then((receipt) => {
            console.log(receipt)
        })
    }

    const callFlipCoin = async () => {
        const flipCoinResult = await flipCoin({
            onSuccess: (tx) => handleFlipCoinSuccess(tx as ContractTransaction),
            onError: (err) => {
                console.log(err)
            },
        })
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateui()
        }
    }, [isWeb3Enabled])

    return !isWeb3Enabled ? (
        <div>Please connect</div>
    ) : (
        <div>
            <Input
                label="Wager"
                name="Test number Input"
                onBlur={function noRefCheck() {}}
                onChange={(e) => setWager(e.target.value)}
                type="number"
                validation={{
                    // required: true,
                    // numberMin: ethers.utils.formatUnits(minimumWager, "ether").toString(),
                    numberMin: 0.1,
                }}
            />
            <div>Minimum wager: {ethers.utils.formatUnits(minimumWager, "ether")}ETH</div>
            <div className="flex flex-row space-x-2">
                <Button
                    onClick={() => setCoinFaceSelection(CoinFace.Heads)}
                    text="Heads"
                    theme={coinFaceSelection == CoinFace.Heads ? "primary" : "text"}
                />
                <Button
                    onClick={() => setCoinFaceSelection(CoinFace.Tails)}
                    text="Tails"
                    theme={coinFaceSelection == CoinFace.Tails ? "primary" : "text"}
                />
            </div>
            <Button
                onClick={async function () {
                    await flipCoin({
                        onSuccess: (tx) => handleFlipCoinSuccess(tx as ContractTransaction),
                    })
                }}
                disabled={isFetching}
                text="Flip"
                theme="primary"
            />
        </div>
    )
}

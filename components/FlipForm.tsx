import { Input, Button } from "web3uikit"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"

export const FlipForm = () => {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()

    const [minimumWager, setMinimumWager] = useState("")

    // const { runContractFunction: getMinimumWager } = useWeb3Contract({
    //     contractAddress: "",
    //     abi: "",
    //     functionName: "",
    //     params: {},
    //     msgValue: "",
    // })

    useEffect(() => {
        console.log(`web3 enabled: ${isWeb3Enabled}`)
    }, [isWeb3Enabled])

    return !isWeb3Enabled ? (
        <div>Please connect</div>
    ) : (
        <div>
            <Input
                label="Wager"
                name="Test number Input"
                onBlur={function noRefCheck() {}}
                onChange={function noRefCheck() {}}
                type="number"
            />
            <div>Minimum wager: {minimumWager}</div>
            <div className="flex flex-row space-x-2">
                <Button onClick={function noRefCheck() {}} text="Heads" theme="" />
                <Button onClick={function noRefCheck() {}} text="Tails" theme="" />
            </div>
            <Button onClick={function noRefCheck() {}} text="Flip" theme="primary" />
        </div>
    )
}

const calculateCalmnessScore = (powerByBands: any) => {

    return Math.floor(
        (100 -
            (3 * powerByBands.THETA +
                2 * powerByBands.ALPHA_LOW +
                powerByBands.ALPHA_HIGH) *
            4) < 2 ? 2 : (100 -
            (3 * powerByBands.THETA +
                2 * powerByBands.ALPHA_LOW +
                powerByBands.ALPHA_HIGH) *
            4) > 50 ? 50 : (100 -
            (3 * powerByBands.THETA +
                2 * powerByBands.ALPHA_LOW +
                powerByBands.ALPHA_HIGH) *
            4)
    )
}


export default {calculateCalmnessScore}
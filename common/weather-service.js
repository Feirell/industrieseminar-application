/**
 * 
 * @param {Date} start 
 * @param {Date} end 
 * @param {Date} at 
 */
function getProgress(start, end, at) {
    return (at.getTime() - start.getTime()) / (end.getTime() - start.getTime());
}

/**
 * 
 * @param {Date} at 
 */
function getStartOfDay(at) {
    return new Date(at.getFullYear(), at.getMonth(), at.getDate());
}

/**
 * 
 * @param {Date} at 
 */
function getEndOfDay(at) {
    return new Date(at.getFullYear(), at.getMonth(), at.getDate() + 1);
}

/**
 * 
 * @param {Date} at 
 */
function getDayProgress(at) {
    return getProgress(
        getStartOfDay(at),
        getEndOfDay(at),
        at);
}

/**
 * 
 * @param {Date} at 
 */
function getStartOfYear(at) {
    return new Date(at.getFullYear(), 0);
}

/**
 * 
 * @param {Date} at 
 */
function getEndOfYear(at) {
    return new Date(at.getFullYear() + 1, 0);
}

/**
 * 
 * @param {Date} at 
 */
function getYearProgress(at) {
    return getProgress(
        getStartOfYear(at),
        getEndOfYear(at),
        at);
}

/**
 * 
 * @param {number} progress
 */
function cyclicProgress(progress) {
    return sin(PI * (progress * 2 - 0.5)) / 2 + 0.5
}

function cyclicWithMinor(progressMain, progressMinor, minorScale) {
    return cyclicProgress(progressMain) + (cyclicProgress(progressMinor) - 0.5) * 2 / minorScale;
}

const { sin, PI } = Math;

function rainProbability(at) {
    return (1 - cyclicProgress(getDayProgress(at))) * cyclicProgress(getYearProgress(at) * 2)
}

class WeatherService {

    /**
     * 
     * @param {Date} at 
     */
    getHumidity(at) {
        // this is a mock
        const day = getDayProgress(at);

        const maxHumidity = 0.6;
        const minHumidity = 0.3;

        return (maxHumidity - minHumidity) * cyclicProgress(day) + minHumidity;
    }

    /**
     * 
     * @param {Date} at 
     */
    getTemperature(at) {
        // this is a mock
        const day = getDayProgress(at);
        const year = getYearProgress(at);

        const maxTemp = 35;
        const minTemp = -10;

        return (maxTemp - minTemp) * cyclicWithMinor(year, day, 200) + minTemp;
    }

    /**
     * 
     * @param {Date} at 
     */
    getSnowProbability(at) {
        const snowFall = cyclicProgress(getYearProgress(at) + 0.75);
        const rainfallProbability = rainProbability(at);
        return snowFall * rainfallProbability;
    }

    /**
     * 
     * @param {Date} at 
     */
    getRainProbability(at) {
        const rainFall = cyclicProgress(getYearProgress(at) + 0.25);
        const rainfallProbability = rainProbability(at);
        return rainFall * rainfallProbability;
    }
}

function getDateShiftedByMinutes(start, shift) {
    const copy = new Date(start);
    copy.setMinutes(copy.getMinutes() + shift);
    return copy;
}

/**
 * 
 * @param {Date} start 
 * @param {Date} end 
 * @param {number} step minutes
 */
function getAtInRange(start, end, step) {
    const ret = [];

    for (let at = start, i = 0; at.getTime() <= end.getTime(); i++ , at = getDateShiftedByMinutes(start, i * step))
        ret.push(at);

    return ret;
}

module.exports = { WeatherService, getAtInRange }
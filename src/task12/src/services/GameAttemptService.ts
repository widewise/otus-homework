import { ISettingsModel } from "@/models/SettingsModel";
import { IGameAttemptModel } from "@/models/GameAttemptModel";
import { calculateExpression } from "@/services/CalculateExpression";
import { IStatisticsModel } from "@/models/StatisticsModel";

const ATTEMPTS_KEY = "ATTEMPTS";

export const gameAttemptService = {
    generateAttempt(settings: ISettingsModel): IGameAttemptModel {
        const operations : Array<string> = [];
        const values : Array<number> = [];
        if(settings.operations && settings.operations.length == 0) {
            return {
                operations,
                values,
                resultValue: 0,
                expressionString: "",
                result: false
            };
        }
        const value = Math.floor(Math.random() * (settings.complexity < 5 ? 10 : 100));
        values.push(value);
        let expressionString = value.toString();
        for (let i = 0; i < settings.complexity / 2; i++) {
            const operation = settings.operations.length == 1
                ? settings.operations[0]
                : settings.operations[Math.floor(Math.random() * (settings.operations.length))];
            operations.push(operation);
            expressionString += operation;
            const value = Math.floor(Math.random() * (settings.complexity < 5 ? 10 : 100));
            values.push(value);
            expressionString += value;
        }

        const resultValue = parseInt(calculateExpression(expressionString));
        return {
            operations,
            values,
            resultValue,
            expressionString,
            result: false
        }
    },

    saveAttempt(attempt: IGameAttemptModel) {
        const attempts : Array<IGameAttemptModel> =
            JSON.parse(localStorage.getItem(ATTEMPTS_KEY) as string) as Array<IGameAttemptModel> ?? [];
        attempts.push(attempt);
        localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
    },

    getStatistics() : IStatisticsModel {
        const attempts : Array<IGameAttemptModel> =
            JSON.parse(localStorage.getItem(ATTEMPTS_KEY) as string) as Array<IGameAttemptModel> ?? [];
        const successCount = attempts.filter(a => a.result).length;
        const totalCount = attempts.length;

        return {
            SuccessCount: successCount,
            TotalCount: totalCount,
            SuccessPercent: Math.floor( successCount * 100 / totalCount)
        }
    }
}
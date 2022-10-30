export interface IWeather {
    date: Date,
    temperature: number
}

export interface ICityWeather {
    id: string,
    name: string,
    data: IWeather[]
}
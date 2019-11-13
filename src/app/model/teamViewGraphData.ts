import { IGraphData } from './graphData';

export interface ITeamViewGraphData {
    TotalOnsite: IGraphData[];
    TotalOffshore: IGraphData[];
    BilledOnsite: IGraphData[];
    BilledOffshore?: IGraphData[];
    Buffer?: IGraphData[];
}
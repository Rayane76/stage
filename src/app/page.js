import ArticleCard from "./components/articleCard";
import CodeProce from "./components/codePrice"
import Nav from "./components/nav"
import Calculatrice from "./components/utils/Calculatrice"
import {CalculatorProvider} from './components/utils/resultProvider'
import {InfoProvider} from './components/utils/infoProvider'
import {TotalProvider} from './components/utils/totalProvider'
import {HistProvider} from './components/utils/historyProvider'

export default function Home() {
  return (
   <>
   <CalculatorProvider>
    <InfoProvider>
      <TotalProvider>
        <HistProvider>
    <ArticleCard />
    </HistProvider>
    </TotalProvider>
    </InfoProvider>
    </CalculatorProvider>
   </>
  );
}

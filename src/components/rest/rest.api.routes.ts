import express, { NextFunction, Request, Response } from "express";
import { createUser } from "../functions/user.functions";
import { getMultipleLTPs } from "nse-quotes-api";
import { newUserValidator } from "../validators/user.validators";
import {
  addStockToPortfolioByDiscordId,
  getPortfolioByDiscordId,
} from "../functions/portfolio.functions";
import {
  addStockToPortfolioValidator,
  getPortfolioValidator,
} from "../validators/portfolio.validators";
import { newStockValidator } from "../validators/stocks.validators";
import { bulkCreateStocks, createStock } from "../functions/stocks.functions";

const router = express.Router();

router.post(
  "/register-user",
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = newUserValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const { discordId } = value;

    const newUserNonce = await createUser(discordId);
    return res.status(newUserNonce.httpStatus).json({ ...newUserNonce });
  }
);

router.post(
  "/create-stock",
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = newStockValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const nonce = await createStock(value.name, value.ticker);
    return res.status(200).json({ ...nonce });
  }
);
router.post(
  "/add-stock",
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = addStockToPortfolioValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const nonce = await addStockToPortfolioByDiscordId(
      value.discordId,
      value.symbol,
      value.quantity
    );
    return res.status(200).json({ ...nonce });
  }
);

router.get("/get-portfolio", async (req: Request, res: Response) => {
  const { value, error } = getPortfolioValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  const nonce = await getPortfolioByDiscordId(value.discordId);
  return res.status(200).json(nonce);
});

router.post("/load-scrips", async (req: Request, res: Response) => {
  const nonce = await bulkCreateStocks(scrips);
  return res.status(200).json({ message: "done" });
});

export default router;

const scrips = [
  {
    tickerSymbol: "20MICRONS",
    name: "20 Microns Limited",
  },
  {
    tickerSymbol: "21STCENMGM",
    name: "21st Century Management Services Limited",
  },
  {
    tickerSymbol: "360ONE",
    name: "360 ONE WAM LIMITED",
  },
  {
    tickerSymbol: "3IINFOLTD",
    name: "3i Infotech Limited",
  },
  {
    tickerSymbol: "3MINDIA",
    name: "3M India Limited",
  },
  {
    tickerSymbol: "3PLAND",
    name: "3P Land Holdings Limited",
  },
  {
    tickerSymbol: "4THDIM",
    name: "Fourth Dimension Solutions Limited",
  },
  {
    tickerSymbol: "5PAISA",
    name: "5Paisa Capital Limited",
  },
  {
    tickerSymbol: "63MOONS",
    name: "63 moons technologies limited",
  },
  {
    tickerSymbol: "A2ZINFRA",
    name: "A2Z Infra Engineering Limited",
  },
  {
    tickerSymbol: "AAATECH",
    name: "AAA Technologies Limited",
  },
  {
    tickerSymbol: "AAKASH",
    name: "Aakash Exploration Services Limited",
  },
  {
    tickerSymbol: "AAREYDRUGS",
    name: "Aarey Drugs & Pharmaceuticals Limited",
  },
  {
    tickerSymbol: "AARON",
    name: "Aaron Industries Limited",
  },
  {
    tickerSymbol: "AARTIDRUGS",
    name: "Aarti Drugs Limited",
  },
  {
    tickerSymbol: "AARTIIND",
    name: "Aarti Industries Limited",
  },
  {
    tickerSymbol: "AARTIPHARM",
    name: "Aarti Pharmalabs Limited",
  },
  {
    tickerSymbol: "AARTISURF",
    name: "Aarti Surfactants Limited",
  },
  {
    tickerSymbol: "AARVEEDEN",
    name: "Aarvee Denims & Exports Limited",
  },
  {
    tickerSymbol: "AARVI",
    name: "Aarvi Encon Limited",
  },
  {
    tickerSymbol: "AAVAS",
    name: "Aavas Financiers Limited",
  },
  {
    tickerSymbol: "ABAN",
    name: "Aban Offshore Limited",
  },
  {
    tickerSymbol: "ABB",
    name: "ABB India Limited",
  },
  {
    tickerSymbol: "ABBOTINDIA",
    name: "Abbott India Limited",
  },
  {
    tickerSymbol: "ABCAPITAL",
    name: "Aditya Birla Capital Limited",
  },
  {
    tickerSymbol: "ABFRL",
    name: "Aditya Birla Fashion and Retail Limited",
  },
  {
    tickerSymbol: "ABMINTLLTD",
    name: "ABM International Limited",
  },
  {
    tickerSymbol: "ABSLAMC",
    name: "Aditya Birla Sun Life AMC Limited",
  },
  {
    tickerSymbol: "ACC",
    name: "ACC Limited",
  },
  {
    tickerSymbol: "ACCELYA",
    name: "Accelya Solutions India Limited",
  },
  {
    tickerSymbol: "ACCURACY",
    name: "Accuracy Shipping Limited",
  },
  {
    tickerSymbol: "ACE",
    name: "Action Construction Equipment Limited",
  },
  {
    tickerSymbol: "ACEINTEG",
    name: "Ace Integrated Solutions Limited",
  },
  {
    tickerSymbol: "ACI",
    name: "Archean Chemical Industries Limited",
  },
  {
    tickerSymbol: "ACL",
    name: "Andhra Cements Limited",
  },
  {
    tickerSymbol: "ADANIENT",
    name: "Adani Enterprises Limited",
  },
  {
    tickerSymbol: "ADANIGREEN",
    name: "Adani Green Energy Limited",
  },
  {
    tickerSymbol: "ADANIPORTS",
    name: "Adani Ports and Special Economic Zone Limited",
  },
  {
    tickerSymbol: "ADANIPOWER",
    name: "Adani Power Limited",
  },
  {
    tickerSymbol: "ADANITRANS",
    name: "Adani Transmission Limited",
  },
  {
    tickerSymbol: "ADFFOODS",
    name: "ADF Foods Limited",
  },
  {
    tickerSymbol: "ADL",
    name: "Archidply Decor Limited",
  },
  {
    tickerSymbol: "ADORWELD",
    name: "Ador Welding Limited",
  },
  {
    tickerSymbol: "ADROITINFO",
    name: "Adroit Infotech Limited",
  },
  {
    tickerSymbol: "ADSL",
    name: "Allied Digital Services Limited",
  },
  {
    tickerSymbol: "ADVANIHOTR",
    name: "Advani Hotels & Resorts (India) Limited",
  },
  {
    tickerSymbol: "ADVENZYMES",
    name: "Advanced Enzyme Technologies Limited",
  },
  {
    tickerSymbol: "AEGISCHEM",
    name: "Aegis Logistics Limited",
  },
  {
    tickerSymbol: "AETHER",
    name: "Aether Industries Limited",
  },
  {
    tickerSymbol: "AFFLE",
    name: "Affle (India) Limited",
  },
  {
    tickerSymbol: "AGARIND",
    name: "Agarwal Industrial Corporation Limited",
  },
  {
    tickerSymbol: "AGI",
    name: "AGI Greenpac Limited",
  },
  {
    tickerSymbol: "AGRITECH",
    name: "Agri-Tech (India) Limited",
  },
  {
    tickerSymbol: "AGROPHOS",
    name: "Agro Phos India Limited",
  },
  {
    tickerSymbol: "AGSTRA",
    name: "AGS Transact Technologies Limited",
  },
  {
    tickerSymbol: "AHL",
    name: "Abans Holdings Limited",
  },
  {
    tickerSymbol: "AHLADA",
    name: "Ahlada Engineers Limited",
  },
  {
    tickerSymbol: "AHLEAST",
    name: "Asian Hotels (East) Limited",
  },
  {
    tickerSymbol: "AHLUCONT",
    name: "Ahluwalia Contracts (India) Limited",
  },
  {
    tickerSymbol: "AIAENG",
    name: "AIA Engineering Limited",
  },
  {
    tickerSymbol: "AIRAN",
    name: "Airan Limited",
  },
  {
    tickerSymbol: "AIROLAM",
    name: "Airo Lam limited",
  },
  {
    tickerSymbol: "AJANTPHARM",
    name: "Ajanta Pharma Limited",
  },
  {
    tickerSymbol: "AJMERA",
    name: "Ajmera Realty & Infra India Limited",
  },
  {
    tickerSymbol: "AJOONI",
    name: "Ajooni Biotech Limited",
  },
  {
    tickerSymbol: "AKASH",
    name: "Akash Infra-Projects Limited",
  },
  {
    tickerSymbol: "AKG",
    name: "Akg Exim Limited",
  },
  {
    tickerSymbol: "AKI",
    name: "AKI India Limited",
  },
  {
    tickerSymbol: "AKSHAR",
    name: "Akshar Spintex Limited",
  },
  {
    tickerSymbol: "AKSHARCHEM",
    name: "AksharChem India Limited",
  },
  {
    tickerSymbol: "AKSHOPTFBR",
    name: "Aksh Optifibre Limited",
  },
  {
    tickerSymbol: "AKZOINDIA",
    name: "Akzo Nobel India Limited",
  },
  {
    tickerSymbol: "ALANKIT",
    name: "Alankit Limited",
  },
  {
    tickerSymbol: "ALBERTDAVD",
    name: "Albert David Limited",
  },
  {
    tickerSymbol: "ALEMBICLTD",
    name: "Alembic Limited",
  },
  {
    tickerSymbol: "ALICON",
    name: "Alicon Castalloy Limited",
  },
  {
    tickerSymbol: "ALKALI",
    name: "Alkali Metals Limited",
  },
  {
    tickerSymbol: "ALKEM",
    name: "Alkem Laboratories Limited",
  },
  {
    tickerSymbol: "ALKYLAMINE",
    name: "Alkyl Amines Chemicals Limited",
  },
  {
    tickerSymbol: "ALLCARGO",
    name: "Allcargo Logistics Limited",
  },
  {
    tickerSymbol: "ALLSEC",
    name: "Allsec Technologies Limited",
  },
  {
    tickerSymbol: "ALMONDZ",
    name: "Almondz Global Securities Limited",
  },
  {
    tickerSymbol: "ALOKINDS",
    name: "Alok Industries Limited",
  },
  {
    tickerSymbol: "ALPA",
    name: "Alpa Laboratories Limited",
  },
  {
    tickerSymbol: "ALPHAGEO",
    name: "Alphageo (India) Limited",
  },
  {
    tickerSymbol: "ALPSINDUS",
    name: "Alps Industries Limited",
  },
  {
    tickerSymbol: "AMARAJABAT",
    name: "Amara Raja Batteries Limited",
  },
  {
    tickerSymbol: "AMBER",
    name: "Amber Enterprises India Limited",
  },
  {
    tickerSymbol: "AMBICAAGAR",
    name: "Ambica Agarbathies & Aroma industries Limited",
  },
  {
    tickerSymbol: "AMBIKCO",
    name: "Ambika Cotton Mills Limited",
  },
  {
    tickerSymbol: "AMBUJACEM",
    name: "Ambuja Cements Limited",
  },
  {
    tickerSymbol: "AMDIND",
    name: "AMD Industries Limited",
  },
  {
    tickerSymbol: "AMIORG",
    name: "Ami Organics Limited",
  },
  {
    tickerSymbol: "AMJLAND",
    name: "Amj Land Holdings Limited",
  },
  {
    tickerSymbol: "AMRUTANJAN",
    name: "Amrutanjan Health Care Limited",
  },
  {
    tickerSymbol: "ANANDRATHI",
    name: "Anand Rathi Wealth Limited",
  },
  {
    tickerSymbol: "ANANTRAJ",
    name: "Anant Raj Limited",
  },
  {
    tickerSymbol: "ANDHRAPAP",
    name: "ANDHRA PAPER LIMITED",
  },
  {
    tickerSymbol: "ANDHRSUGAR",
    name: "The Andhra Sugars Limited",
  },
  {
    tickerSymbol: "ANDREWYU",
    name: "Andrew Yule & Company Limited",
  },
  {
    tickerSymbol: "ANGELONE",
    name: "Angel One Limited",
  },
  {
    tickerSymbol: "ANIKINDS",
    name: "Anik Industries Limited",
  },
  {
    tickerSymbol: "ANKITMETAL",
    name: "Ankit Metal & Power Limited",
  },
  {
    tickerSymbol: "ANMOL",
    name: "Anmol India Limited",
  },
  {
    tickerSymbol: "ANSALAPI",
    name: "Ansal Properties & Infrastructure Limited",
  },
  {
    tickerSymbol: "ANTGRAPHIC",
    name: "Antarctica Limited",
  },
  {
    tickerSymbol: "ANUP",
    name: "The Anup Engineering Limited",
  },
  {
    tickerSymbol: "ANURAS",
    name: "Anupam Rasayan India Limited",
  },
  {
    tickerSymbol: "APARINDS",
    name: "Apar Industries Limited",
  },
  {
    tickerSymbol: "APCL",
    name: "Anjani Portland Cement Limited",
  },
  {
    tickerSymbol: "APCOTEXIND",
    name: "Apcotex Industries Limited",
  },
  {
    tickerSymbol: "APEX",
    name: "Apex Frozen Foods Limited",
  },
  {
    tickerSymbol: "APLAPOLLO",
    name: "APL Apollo Tubes Limited",
  },
  {
    tickerSymbol: "APLLTD",
    name: "Alembic Pharmaceuticals Limited",
  },
  {
    tickerSymbol: "APOLLO",
    name: "Apollo Micro Systems Limited",
  },
  {
    tickerSymbol: "APOLLOHOSP",
    name: "Apollo Hospitals Enterprise Limited",
  },
  {
    tickerSymbol: "APOLLOPIPE",
    name: "Apollo Pipes Limited",
  },
  {
    tickerSymbol: "APOLLOTYRE",
    name: "Apollo Tyres Limited",
  },
  {
    tickerSymbol: "APOLSINHOT",
    name: "Apollo Sindoori Hotels Limited",
  },
  {
    tickerSymbol: "APTECHT",
    name: "Aptech Limited",
  },
  {
    tickerSymbol: "APTUS",
    name: "Aptus Value Housing Finance India Limited",
  },
  {
    tickerSymbol: "ARCHIDPLY",
    name: "Archidply Industries Limited",
  },
  {
    tickerSymbol: "ARCHIES",
    name: "Archies Limited",
  },
  {
    tickerSymbol: "ARENTERP",
    name: "Rajdarshan Industries Limited",
  },
  {
    tickerSymbol: "ARIES",
    name: "Aries Agro Limited",
  },
  {
    tickerSymbol: "ARIHANTCAP",
    name: "Arihant Capital Markets Limited",
  },
  {
    tickerSymbol: "ARIHANTSUP",
    name: "Arihant Superstructures Limited",
  },
  {
    tickerSymbol: "ARMANFIN",
    name: "Arman Financial Services Limited",
  },
  {
    tickerSymbol: "AROGRANITE",
    name: "Aro Granite Industries Limited",
  },
  {
    tickerSymbol: "ARROWGREEN",
    name: "Arrow Greentech Limited",
  },
  {
    tickerSymbol: "ARSHIYA",
    name: "Arshiya Limited",
  },
  {
    tickerSymbol: "ARTEMISMED",
    name: "Artemis Medicare Services Limited",
  },
  {
    tickerSymbol: "ARTNIRMAN",
    name: "Art Nirman Limited",
  },
  {
    tickerSymbol: "ARVEE",
    name: "Arvee Laboratories (India) Limited",
  },
  {
    tickerSymbol: "ARVIND",
    name: "Arvind Limited",
  },
  {
    tickerSymbol: "ARVINDFASN",
    name: "Arvind Fashions Limited",
  },
  {
    tickerSymbol: "ARVSMART",
    name: "Arvind SmartSpaces Limited",
  },
  {
    tickerSymbol: "ASAHIINDIA",
    name: "Asahi India Glass Limited",
  },
  {
    tickerSymbol: "ASAHISONG",
    name: "Asahi Songwon Colors Limited",
  },
  {
    tickerSymbol: "ASAL",
    name: "Automotive Stampings and Assemblies Limited",
  },
  {
    tickerSymbol: "ASALCBR",
    name: "Associated Alcohols & Breweries Ltd.",
  },
  {
    tickerSymbol: "ASHAPURMIN",
    name: "Ashapura Minechem Limited",
  },
  {
    tickerSymbol: "ASHIANA",
    name: "Ashiana Housing Limited",
  },
  {
    tickerSymbol: "ASHIMASYN",
    name: "Ashima Limited",
  },
  {
    tickerSymbol: "ASHOKA",
    name: "Ashoka Buildcon Limited",
  },
  {
    tickerSymbol: "ASHOKLEY",
    name: "Ashok Leyland Limited",
  },
  {
    tickerSymbol: "ASIANENE",
    name: "Asian Energy Services Limited",
  },
  {
    tickerSymbol: "ASIANHOTNR",
    name: "Asian Hotels (North) Limited",
  },
  {
    tickerSymbol: "ASIANPAINT",
    name: "Asian Paints Limited",
  },
  {
    tickerSymbol: "ASIANTILES",
    name: "Asian Granito India Limited",
  },
  {
    tickerSymbol: "ASMS",
    name: "Bartronics India Limited",
  },
  {
    tickerSymbol: "ASPINWALL",
    name: "Aspinwall and Company Limited",
  },
  {
    tickerSymbol: "ASTEC",
    name: "Astec LifeSciences Limited",
  },
  {
    tickerSymbol: "ASTERDM",
    name: "Aster DM Healthcare Limited",
  },
  {
    tickerSymbol: "ASTRAL",
    name: "Astral Limited",
  },
  {
    tickerSymbol: "ASTRAMICRO",
    name: "Astra Microwave Products Limited",
  },
  {
    tickerSymbol: "ASTRAZEN",
    name: "AstraZeneca Pharma India Limited",
  },
  {
    tickerSymbol: "ASTRON",
    name: "Astron Paper & Board Mill Limited",
  },
  {
    tickerSymbol: "ATALREAL",
    name: "Atal Realtech Limited",
  },
  {
    tickerSymbol: "ATAM",
    name: "Atam Valves Limited",
  },
  {
    tickerSymbol: "ATFL",
    name: "Agro Tech Foods Limited",
  },
  {
    tickerSymbol: "ATGL",
    name: "Adani Total Gas Limited",
  },
  {
    tickerSymbol: "ATLANTA",
    name: "Atlanta  Limited",
  },
  {
    tickerSymbol: "ATUL",
    name: "Atul Limited",
  },
  {
    tickerSymbol: "ATULAUTO",
    name: "Atul Auto Limited",
  },
  {
    tickerSymbol: "AUBANK",
    name: "AU Small Finance Bank Limited",
  },
  {
    tickerSymbol: "AURIONPRO",
    name: "Aurionpro Solutions Limited",
  },
  {
    tickerSymbol: "AUROPHARMA",
    name: "Aurobindo Pharma Limited",
  },
  {
    tickerSymbol: "AURUM",
    name: "Aurum PropTech Limited",
  },
  {
    tickerSymbol: "AUSOMENT",
    name: "Ausom Enterprise Limited",
  },
  {
    tickerSymbol: "AUTOAXLES",
    name: "Automotive Axles Limited",
  },
  {
    tickerSymbol: "AUTOIND",
    name: "Autoline Industries Limited",
  },
  {
    tickerSymbol: "AVADHSUGAR",
    name: "Avadh Sugar & Energy Limited",
  },
  {
    tickerSymbol: "AVALON",
    name: "Avalon Technologies Limited",
  },
  {
    tickerSymbol: "AVANTIFEED",
    name: "Avanti Feeds Limited",
  },
  {
    tickerSymbol: "AVG",
    name: "AVG Logistics Limited",
  },
  {
    tickerSymbol: "AVONMORE",
    name: "Avonmore Capital & Management Services Limited",
  },
  {
    tickerSymbol: "AVROIND",
    name: "AVRO INDIA LIMITED",
  },
  {
    tickerSymbol: "AVTNPL",
    name: "AVT Natural Products Limited",
  },
  {
    tickerSymbol: "AWHCL",
    name: "Antony Waste Handling Cell Limited",
  },
  {
    tickerSymbol: "AWL",
    name: "Adani Wilmar Limited",
  },
  {
    tickerSymbol: "AXISBANK",
    name: "Axis Bank Limited",
  },
  {
    tickerSymbol: "AXISCADES",
    name: "AXISCADES Technologies Limited",
  },
  {
    tickerSymbol: "AXITA",
    name: "Axita Cotton Limited",
  },
  {
    tickerSymbol: "AYMSYNTEX",
    name: "AYM Syntex Limited",
  },
  {
    tickerSymbol: "BAFNAPH",
    name: "Bafna Pharmaceuticals Limited",
  },
  {
    tickerSymbol: "BAGFILMS",
    name: "B.A.G Films and Media Limited",
  },
  {
    tickerSymbol: "BAIDFIN",
    name: "Baid Finserv Limited",
  },
  {
    tickerSymbol: "BAJAJ-AUTO",
    name: "Bajaj Auto Limited",
  },
  {
    tickerSymbol: "BAJAJCON",
    name: "Bajaj Consumer Care Limited",
  },
  {
    tickerSymbol: "BAJAJELEC",
    name: "Bajaj Electricals Limited",
  },
  {
    tickerSymbol: "BAJAJFINSV",
    name: "Bajaj Finserv Limited",
  },
  {
    tickerSymbol: "BAJAJHCARE",
    name: "Bajaj Healthcare Limited",
  },
  {
    tickerSymbol: "BAJAJHIND",
    name: "Bajaj Hindusthan Sugar Limited",
  },
  {
    tickerSymbol: "BAJAJHLDNG",
    name: "Bajaj Holdings & Investment Limited",
  },
  {
    tickerSymbol: "BAJFINANCE",
    name: "Bajaj Finance Limited",
  },
  {
    tickerSymbol: "BALAJITELE",
    name: "Balaji Telefilms Limited",
  },
  {
    tickerSymbol: "BALAMINES",
    name: "Balaji Amines Limited",
  },
  {
    tickerSymbol: "BALAXI",
    name: "BALAXI PHARMACEUTICALS LIMITED",
  },
  {
    tickerSymbol: "BALKRISHNA",
    name: "Balkrishna Paper Mills Limited",
  },
  {
    tickerSymbol: "BALKRISIND",
    name: "Balkrishna Industries Limited",
  },
  {
    tickerSymbol: "BALLARPUR",
    name: "Ballarpur Industries Limited",
  },
  {
    tickerSymbol: "BALMLAWRIE",
    name: "Balmer Lawrie & Company Limited",
  },
  {
    tickerSymbol: "BALPHARMA",
    name: "Bal Pharma Limited",
  },
  {
    tickerSymbol: "BALRAMCHIN",
    name: "Balrampur Chini Mills Limited",
  },
  {
    tickerSymbol: "BANARBEADS",
    name: "Banaras Beads Limited",
  },
  {
    tickerSymbol: "BANARISUG",
    name: "Bannari Amman Sugars Limited",
  },
  {
    tickerSymbol: "BANCOINDIA",
    name: "Banco Products (I) Limited",
  },
  {
    tickerSymbol: "BANDHANBNK",
    name: "Bandhan Bank Limited",
  },
  {
    tickerSymbol: "BANG",
    name: "Bang Overseas Limited",
  },
  {
    tickerSymbol: "BANKA",
    name: "Banka BioLoo Limited",
  },
  {
    tickerSymbol: "BANKBARODA",
    name: "Bank of Baroda",
  },
  {
    tickerSymbol: "BANKINDIA",
    name: "Bank of India",
  },
  {
    tickerSymbol: "BANSWRAS",
    name: "Banswara Syntex Limited",
  },
  {
    tickerSymbol: "BARBEQUE",
    name: "Barbeque Nation Hospitality Limited",
  },
  {
    tickerSymbol: "BASF",
    name: "BASF India Limited",
  },
  {
    tickerSymbol: "BASML",
    name: "Bannari Amman Spinning Mills Limited",
  },
  {
    tickerSymbol: "BATAINDIA",
    name: "Bata India Limited",
  },
  {
    tickerSymbol: "BAYERCROP",
    name: "Bayer Cropscience Limited",
  },
  {
    tickerSymbol: "BBL",
    name: "Bharat Bijlee Limited",
  },
  {
    tickerSymbol: "BBOX",
    name: "Black Box Limited",
  },
  {
    tickerSymbol: "BBTC",
    name: "Bombay Burmah Trading Corporation Limited",
  },
  {
    tickerSymbol: "BBTCL",
    name: "B&B Triplewall Containers Limited",
  },
  {
    tickerSymbol: "BCG",
    name: "Brightcom Group Limited",
  },
  {
    tickerSymbol: "BCLIND",
    name: "Bcl Industries Limited",
  },
  {
    tickerSymbol: "BCONCEPTS",
    name: "Brand Concepts Limited",
  },
  {
    tickerSymbol: "BDL",
    name: "Bharat Dynamics Limited",
  },
  {
    tickerSymbol: "BEARDSELL",
    name: "Beardsell Limited",
  },
  {
    tickerSymbol: "BECTORFOOD",
    name: "Mrs. Bectors Food Specialities Limited",
  },
  {
    tickerSymbol: "BEDMUTHA",
    name: "Bedmutha Industries Limited",
  },
  {
    tickerSymbol: "BEL",
    name: "Bharat Electronics Limited",
  },
  {
    tickerSymbol: "BEML",
    name: "BEML Limited",
  },
  {
    tickerSymbol: "BEPL",
    name: "Bhansali Engineering Polymers Limited",
  },
  {
    tickerSymbol: "BERGEPAINT",
    name: "Berger Paints (I) Limited",
  },
  {
    tickerSymbol: "BESTAGRO",
    name: "Best Agrolife Limited",
  },
  {
    tickerSymbol: "BFINVEST",
    name: "BF Investment Limited",
  },
  {
    tickerSymbol: "BFUTILITIE",
    name: "BF Utilities Limited",
  },
  {
    tickerSymbol: "BGRENERGY",
    name: "BGR Energy Systems Limited",
  },
  {
    tickerSymbol: "BHAGCHEM",
    name: "Bhagiradha Chemicals & Industries Limited",
  },
  {
    tickerSymbol: "BHAGERIA",
    name: "Bhageria Industries Limited",
  },
  {
    tickerSymbol: "BHAGYANGR",
    name: "Bhagyanagar India Limited",
  },
  {
    tickerSymbol: "BHANDARI",
    name: "Bhandari Hosiery Exports Limited",
  },
  {
    tickerSymbol: "BHARATFORG",
    name: "Bharat Forge Limited",
  },
  {
    tickerSymbol: "BHARATGEAR",
    name: "Bharat Gears Limited",
  },
  {
    tickerSymbol: "BHARATRAS",
    name: "Bharat Rasayan Limited",
  },
  {
    tickerSymbol: "BHARATWIRE",
    name: "Bharat Wire Ropes Limited",
  },
  {
    tickerSymbol: "BHARTIARTL",
    name: "Bharti Airtel Limited",
  },
  {
    tickerSymbol: "BHEL",
    name: "Bharat Heavy Electricals Limited",
  },
  {
    tickerSymbol: "BIGBLOC",
    name: "Bigbloc Construction Limited",
  },
  {
    tickerSymbol: "BIKAJI",
    name: "Bikaji Foods International Limited",
  },
  {
    tickerSymbol: "BIL",
    name: "Bhartiya International Limited",
  },
  {
    tickerSymbol: "BINANIIND",
    name: "Binani Industries Limited",
  },
  {
    tickerSymbol: "BINDALAGRO",
    name: "Oswal Chemicals & Fertilizers Limited",
  },
  {
    tickerSymbol: "BIOCON",
    name: "Biocon Limited",
  },
  {
    tickerSymbol: "BIOFILCHEM",
    name: "Biofil Chemicals & Pharmaceuticals Limited",
  },
  {
    tickerSymbol: "BIRLACABLE",
    name: "Birla Cable Limited",
  },
  {
    tickerSymbol: "BIRLACORPN",
    name: "Birla Corporation Limited",
  },
  {
    tickerSymbol: "BIRLAMONEY",
    name: "Aditya Birla Money Limited",
  },
  {
    tickerSymbol: "BIRLATYRE",
    name: "Birla Tyres Limited",
  },
  {
    tickerSymbol: "BLAL",
    name: "BEML Land Assets Limited",
  },
  {
    tickerSymbol: "BLBLIMITED",
    name: "BLB Limited",
  },
  {
    tickerSymbol: "BLISSGVS",
    name: "Bliss GVS Pharma Limited",
  },
  {
    tickerSymbol: "BLKASHYAP",
    name: "B. L. Kashyap and Sons Limited",
  },
  {
    tickerSymbol: "BLS",
    name: "BLS International Services Limited",
  },
  {
    tickerSymbol: "BLUECOAST",
    name: "Blue Coast Hotels Limited",
  },
  {
    tickerSymbol: "BLUEDART",
    name: "Blue Dart Express Limited",
  },
  {
    tickerSymbol: "BLUESTARCO",
    name: "Blue Star Limited",
  },
  {
    tickerSymbol: "BODALCHEM",
    name: "Bodal Chemicals Limited",
  },
  {
    tickerSymbol: "BOHRAIND",
    name: "Bohra Industries Limited",
  },
  {
    tickerSymbol: "BOMDYEING",
    name: "Bombay Dyeing & Mfg Company Limited",
  },
  {
    tickerSymbol: "BOROLTD",
    name: "Borosil Limited",
  },
  {
    tickerSymbol: "BORORENEW",
    name: "BOROSIL RENEWABLES LIMITED",
  },
  {
    tickerSymbol: "BOSCHLTD",
    name: "Bosch Limited",
  },
  {
    tickerSymbol: "BPCL",
    name: "Bharat Petroleum Corporation Limited",
  },
  {
    tickerSymbol: "BPL",
    name: "BPL Limited",
  },
  {
    tickerSymbol: "BRIGADE",
    name: "Brigade Enterprises Limited",
  },
  {
    tickerSymbol: "BRITANNIA",
    name: "Britannia Industries Limited",
  },
  {
    tickerSymbol: "BRNL",
    name: "Bharat Road Network Limited",
  },
  {
    tickerSymbol: "BROOKS",
    name: "Brooks Laboratories Limited",
  },
  {
    tickerSymbol: "BSE",
    name: "BSE Limited",
  },
  {
    tickerSymbol: "BSHSL",
    name: "Bombay Super Hybrid Seeds Limited",
  },
  {
    tickerSymbol: "BSL",
    name: "BSL Limited",
  },
  {
    tickerSymbol: "BSOFT",
    name: "BIRLASOFT LIMITED",
  },
  {
    tickerSymbol: "BTML",
    name: "Bodhi Tree Multimedia Limited",
  },
  {
    tickerSymbol: "BURNPUR",
    name: "Burnpur Cement Limited",
  },
  {
    tickerSymbol: "BUTTERFLY",
    name: "Butterfly Gandhimathi Appliances Limited",
  },
  {
    tickerSymbol: "BVCL",
    name: "Barak Valley Cements Limited",
  },
  {
    tickerSymbol: "BYKE",
    name: "The Byke Hospitality Ltd",
  },
  {
    tickerSymbol: "CALSOFT",
    name: "California Software Company Limited",
  },
  {
    tickerSymbol: "CAMLINFINE",
    name: "Camlin Fine Sciences Limited",
  },
  {
    tickerSymbol: "CAMPUS",
    name: "Campus Activewear Limited",
  },
  {
    tickerSymbol: "CAMS",
    name: "Computer Age Management Services Limited",
  },
  {
    tickerSymbol: "CANBK",
    name: "Canara Bank",
  },
  {
    tickerSymbol: "CANFINHOME",
    name: "Can Fin Homes Limited",
  },
  {
    tickerSymbol: "CANTABIL",
    name: "Cantabil Retail India Limited",
  },
  {
    tickerSymbol: "CAPACITE",
    name: "Capacit'e Infraprojects Limited",
  },
  {
    tickerSymbol: "CAPLIPOINT",
    name: "Caplin Point Laboratories Limited",
  },
  {
    tickerSymbol: "CAPTRUST",
    name: "Capital Trust Limited",
  },
  {
    tickerSymbol: "CARBORUNIV",
    name: "Carborundum Universal Limited",
  },
  {
    tickerSymbol: "CAREERP",
    name: "Career Point Limited",
  },
  {
    tickerSymbol: "CARERATING",
    name: "CARE Ratings Limited",
  },
  {
    tickerSymbol: "CARTRADE",
    name: "Cartrade Tech Limited",
  },
  {
    tickerSymbol: "CARYSIL",
    name: "CARYSIL LIMITED",
  },
  {
    tickerSymbol: "CASTROLIND",
    name: "Castrol India Limited",
  },
  {
    tickerSymbol: "CCCL",
    name: "Consolidated Construction Consortium Limited",
  },
  {
    tickerSymbol: "CCHHL",
    name: "Country Club Hospitality & Holidays Limited",
  },
  {
    tickerSymbol: "CCL",
    name: "CCL Products (India) Limited",
  },
  {
    tickerSymbol: "CDSL",
    name: "Central Depository Services (India) Limited",
  },
  {
    tickerSymbol: "CEATLTD",
    name: "CEAT Limited",
  },
  {
    tickerSymbol: "CELEBRITY",
    name: "Celebrity Fashions Limited",
  },
  {
    tickerSymbol: "CENTENKA",
    name: "Century Enka Limited",
  },
  {
    tickerSymbol: "CENTEXT",
    name: "Century Extrusions Limited",
  },
  {
    tickerSymbol: "CENTRALBK",
    name: "Central Bank of India",
  },
  {
    tickerSymbol: "CENTRUM",
    name: "Centrum Capital Limited",
  },
  {
    tickerSymbol: "CENTUM",
    name: "Centum Electronics Limited",
  },
  {
    tickerSymbol: "CENTURYPLY",
    name: "Century Plyboards (India) Limited",
  },
  {
    tickerSymbol: "CENTURYTEX",
    name: "Century Textiles & Industries Limited",
  },
  {
    tickerSymbol: "CERA",
    name: "Cera Sanitaryware Limited",
  },
  {
    tickerSymbol: "CEREBRAINT",
    name: "Cerebra Integrated Technologies Limited",
  },
  {
    tickerSymbol: "CESC",
    name: "CESC Limited",
  },
  {
    tickerSymbol: "CGCL",
    name: "Capri Global Capital Limited",
  },
  {
    tickerSymbol: "CGPOWER",
    name: "CG Power and Industrial Solutions Limited",
  },
  {
    tickerSymbol: "CHALET",
    name: "Chalet Hotels Limited",
  },
  {
    tickerSymbol: "CHAMBLFERT",
    name: "Chambal Fertilizers & Chemicals Limited",
  },
  {
    tickerSymbol: "CHEMBOND",
    name: "Chembond Chemicals Ltd",
  },
  {
    tickerSymbol: "CHEMCON",
    name: "Chemcon Speciality Chemicals Limited",
  },
  {
    tickerSymbol: "CHEMFAB",
    name: "Chemfab Alkalis Limited",
  },
  {
    tickerSymbol: "CHEMPLASTS",
    name: "Chemplast Sanmar Limited",
  },
  {
    tickerSymbol: "CHENNPETRO",
    name: "Chennai Petroleum Corporation Limited",
  },
  {
    tickerSymbol: "CHEVIOT",
    name: "Cheviot Company Limited",
  },
  {
    tickerSymbol: "CHOICEIN",
    name: "Choice International Limited",
  },
  {
    tickerSymbol: "CHOLAFIN",
    name: "Cholamandalam Investment and Finance Company Limited",
  },
  {
    tickerSymbol: "CHOLAHLDNG",
    name: "Cholamandalam Financial Holdings Limited",
  },
  {
    tickerSymbol: "CIGNITITEC",
    name: "Cigniti Technologies Limited",
  },
  {
    tickerSymbol: "CINELINE",
    name: "Cineline India Limited",
  },
  {
    tickerSymbol: "CINEVISTA",
    name: "Cinevista Limited",
  },
  {
    tickerSymbol: "CIPLA",
    name: "Cipla Limited",
  },
  {
    tickerSymbol: "CLEAN",
    name: "Clean Science and Technology Limited",
  },
  {
    tickerSymbol: "CLEDUCATE",
    name: "CL Educate Limited",
  },
  {
    tickerSymbol: "CLSEL",
    name: "Chaman Lal Setia Exports Limited",
  },
  {
    tickerSymbol: "CMICABLES",
    name: "CMI Limited",
  },
  {
    tickerSymbol: "CMSINFO",
    name: "CMS Info Systems Limited",
  },
  {
    tickerSymbol: "COALINDIA",
    name: "Coal India Limited",
  },
  {
    tickerSymbol: "COASTCORP",
    name: "Coastal Corporation Limited",
  },
  {
    tickerSymbol: "COCHINSHIP",
    name: "Cochin Shipyard Limited",
  },
  {
    tickerSymbol: "COFFEEDAY",
    name: "Coffee Day Enterprises Limited",
  },
  {
    tickerSymbol: "COFORGE",
    name: "Coforge Limited",
  },
  {
    tickerSymbol: "COLPAL",
    name: "Colgate Palmolive (India) Limited",
  },
  {
    tickerSymbol: "COMPINFO",
    name: "Compuage Infocom Limited",
  },
  {
    tickerSymbol: "COMPUSOFT",
    name: "Compucom Software Limited",
  },
  {
    tickerSymbol: "CONCOR",
    name: "Container Corporation of India Limited",
  },
  {
    tickerSymbol: "CONFIPET",
    name: "Confidence Petroleum India Limited",
  },
  {
    tickerSymbol: "CONSOFINVT",
    name: "Consolidated Finvest & Holdings Limited",
  },
  {
    tickerSymbol: "CONTROLPR",
    name: "Control Print Limited",
  },
  {
    tickerSymbol: "CORALFINAC",
    name: "Coral India Finance & Housing Limited",
  },
  {
    tickerSymbol: "CORDSCABLE",
    name: "Cords Cable Industries Limited",
  },
  {
    tickerSymbol: "COROMANDEL",
    name: "Coromandel International Limited",
  },
  {
    tickerSymbol: "COSMOFIRST",
    name: "COSMO FIRST LIMITED",
  },
  {
    tickerSymbol: "COUNCODOS",
    name: "Country Condo's Limited",
  },
  {
    tickerSymbol: "CRAFTSMAN",
    name: "Craftsman Automation Limited",
  },
  {
    tickerSymbol: "CREATIVE",
    name: "Creative Newtech Limited",
  },
  {
    tickerSymbol: "CREATIVEYE",
    name: "Creative Eye Limited",
  },
  {
    tickerSymbol: "CREDITACC",
    name: "CREDITACCESS GRAMEEN LIMITED",
  },
  {
    tickerSymbol: "CREST",
    name: "Crest Ventures Limited",
  },
  {
    tickerSymbol: "CRISIL",
    name: "CRISIL Limited",
  },
  {
    tickerSymbol: "CROMPTON",
    name: "Crompton Greaves Consumer Electricals Limited",
  },
  {
    tickerSymbol: "CROWN",
    name: "Crown Lifters Limited",
  },
  {
    tickerSymbol: "CSBBANK",
    name: "CSB Bank Limited",
  },
  {
    tickerSymbol: "CSLFINANCE",
    name: "CSL Finance Limited",
  },
  {
    tickerSymbol: "CTE",
    name: "Cambridge Technology Enterprises Limited",
  },
  {
    tickerSymbol: "CUB",
    name: "City Union Bank Limited",
  },
  {
    tickerSymbol: "CUBEXTUB",
    name: "Cubex Tubings Limited",
  },
  {
    tickerSymbol: "CUMMINSIND",
    name: "Cummins India Limited",
  },
  {
    tickerSymbol: "CUPID",
    name: "Cupid Limited",
  },
  {
    tickerSymbol: "CYBERMEDIA",
    name: "Cyber Media (India) Limited",
  },
  {
    tickerSymbol: "CYBERTECH",
    name: "Cybertech Systems And Software Limited",
  },
  {
    tickerSymbol: "CYIENT",
    name: "Cyient Limited",
  },
  {
    tickerSymbol: "DAAWAT",
    name: "LT Foods Limited",
  },
  {
    tickerSymbol: "DABUR",
    name: "Dabur India Limited",
  },
  {
    tickerSymbol: "DALBHARAT",
    name: "Dalmia Bharat Limited",
  },
  {
    tickerSymbol: "DALMIASUG",
    name: "Dalmia Bharat Sugar and Industries Limited",
  },
  {
    tickerSymbol: "DAMODARIND",
    name: "Damodar Industries Limited",
  },
  {
    tickerSymbol: "DANGEE",
    name: "Dangee Dums Limited",
  },
  {
    tickerSymbol: "DATAMATICS",
    name: "Datamatics Global Services Limited",
  },
  {
    tickerSymbol: "DATAPATTNS",
    name: "Data Patterns (India) Limited",
  },
  {
    tickerSymbol: "DBCORP",
    name: "D.B.Corp Limited",
  },
  {
    tickerSymbol: "DBL",
    name: "Dilip Buildcon Limited",
  },
  {
    tickerSymbol: "DBOL",
    name: "Dhampur Bio Organics Limited",
  },
  {
    tickerSymbol: "DBREALTY",
    name: "D B Realty Limited",
  },
  {
    tickerSymbol: "DBSTOCKBRO",
    name: "DB (International) Stock Brokers Limited",
  },
  {
    tickerSymbol: "DCAL",
    name: "Dishman Carbogen Amcis Limited",
  },
  {
    tickerSymbol: "DCBBANK",
    name: "DCB Bank Limited",
  },
  {
    tickerSymbol: "DCI",
    name: "Dc Infotech And Communication Limited",
  },
  {
    tickerSymbol: "DCM",
    name: "DCM  Limited",
  },
  {
    tickerSymbol: "DCMFINSERV",
    name: "DCM Financial Services Limited",
  },
  {
    tickerSymbol: "DCMNVL",
    name: "DCM Nouvelle Limited",
  },
  {
    tickerSymbol: "DCMSHRIRAM",
    name: "DCM Shriram Limited",
  },
  {
    tickerSymbol: "DCMSRIND",
    name: "DCM Shriram Industries Limited",
  },
  {
    tickerSymbol: "DCW",
    name: "DCW Limited",
  },
  {
    tickerSymbol: "DCXINDIA",
    name: "DCX Systems Limited",
  },
  {
    tickerSymbol: "DECCANCE",
    name: "Deccan Cements Limited",
  },
  {
    tickerSymbol: "DEEPAKFERT",
    name: "Deepak Fertilizers and Petrochemicals Corporation Limited",
  },
  {
    tickerSymbol: "DEEPAKNTR",
    name: "Deepak Nitrite Limited",
  },
  {
    tickerSymbol: "DEEPENR",
    name: "DEEP ENERGY RESOURCES LIMITED",
  },
  {
    tickerSymbol: "DEEPINDS",
    name: "Deep Industries Limited",
  },
  {
    tickerSymbol: "DELHIVERY",
    name: "Delhivery Limited",
  },
  {
    tickerSymbol: "DELPHIFX",
    name: "DELPHI WORLD MONEY LIMITED",
  },
  {
    tickerSymbol: "DELTACORP",
    name: "Delta Corp Limited",
  },
  {
    tickerSymbol: "DELTAMAGNT",
    name: "Delta Manufacturing Limited",
  },
  {
    tickerSymbol: "DEN",
    name: "Den Networks Limited",
  },
  {
    tickerSymbol: "DENORA",
    name: "De Nora India Limited",
  },
  {
    tickerSymbol: "DEVIT",
    name: "Dev Information Technology Limited",
  },
  {
    tickerSymbol: "DEVYANI",
    name: "Devyani International Limited",
  },
  {
    tickerSymbol: "DGCONTENT",
    name: "Digicontent Limited",
  },
  {
    tickerSymbol: "DHAMPURSUG",
    name: "Dhampur Sugar Mills Limited",
  },
  {
    tickerSymbol: "DHANBANK",
    name: "Dhanlaxmi Bank Limited",
  },
  {
    tickerSymbol: "DHANI",
    name: "Dhani Services Limited",
  },
  {
    tickerSymbol: "DHANUKA",
    name: "Dhanuka Agritech Limited",
  },
  {
    tickerSymbol: "DHARMAJ",
    name: "Dharmaj Crop Guard Limited",
  },
  {
    tickerSymbol: "DHARSUGAR",
    name: "Dharani Sugars&Chemicals Limited",
  },
  {
    tickerSymbol: "DHRUV",
    name: "Dhruv Consultancy Services Limited",
  },
  {
    tickerSymbol: "DHUNINV",
    name: "Dhunseri Investments Limited",
  },
  {
    tickerSymbol: "DIAMONDYD",
    name: "Prataap Snacks Limited",
  },
  {
    tickerSymbol: "DICIND",
    name: "DIC India Limited",
  },
  {
    tickerSymbol: "DIGISPICE",
    name: "DiGiSPICE Technologies Limited",
  },
  {
    tickerSymbol: "DIGJAMLMTD",
    name: "Digjam Limited",
  },
  {
    tickerSymbol: "DIL",
    name: "Debock Industries Limited",
  },
  {
    tickerSymbol: "DISHTV",
    name: "Dish TV India Limited",
  },
  {
    tickerSymbol: "DIVGIITTS",
    name: "Divgi Torqtransfer Systems Limited",
  },
  {
    tickerSymbol: "DIVISLAB",
    name: "Divi's Laboratories Limited",
  },
  {
    tickerSymbol: "DIXON",
    name: "Dixon Technologies (India) Limited",
  },
  {
    tickerSymbol: "DJML",
    name: "DJ Mediaprint & Logistics Limited",
  },
  {
    tickerSymbol: "DLF",
    name: "DLF Limited",
  },
  {
    tickerSymbol: "DLINKINDIA",
    name: "D-Link (India) Limited",
  },
  {
    tickerSymbol: "DMART",
    name: "Avenue Supermarts Limited",
  },
  {
    tickerSymbol: "DMCC",
    name: "DMCC SPECIALITY CHEMICALS LIMITED",
  },
  {
    tickerSymbol: "DNAMEDIA",
    name: "Diligent Media Corporation Limited",
  },
  {
    tickerSymbol: "DODLA",
    name: "Dodla Dairy Limited",
  },
  {
    tickerSymbol: "DOLATALGO",
    name: "Dolat Algotech Limited",
  },
  {
    tickerSymbol: "DOLLAR",
    name: "Dollar Industries Limited",
  },
  {
    tickerSymbol: "DONEAR",
    name: "Donear Industries Limited",
  },
  {
    tickerSymbol: "DPABHUSHAN",
    name: "D. P. Abhushan Limited",
  },
  {
    tickerSymbol: "DPSCLTD",
    name: "DPSC Limited",
  },
  {
    tickerSymbol: "DPWIRES",
    name: "D P Wires Limited",
  },
  {
    tickerSymbol: "DRCSYSTEMS",
    name: "DRC Systems India Limited",
  },
  {
    tickerSymbol: "DREAMFOLKS",
    name: "Dreamfolks Services Limited",
  },
  {
    tickerSymbol: "DREDGECORP",
    name: "Dredging Corporation of India Limited",
  },
  {
    tickerSymbol: "DRREDDY",
    name: "Dr. Reddy's Laboratories Limited",
  },
  {
    tickerSymbol: "DSSL",
    name: "Dynacons Systems & Solutions Limited",
  },
  {
    tickerSymbol: "DTIL",
    name: "Dhunseri Tea & Industries Limited",
  },
  {
    tickerSymbol: "DUCON",
    name: "Ducon Infratechnologies Limited",
  },
  {
    tickerSymbol: "DVL",
    name: "Dhunseri Ventures Limited",
  },
  {
    tickerSymbol: "DWARKESH",
    name: "Dwarikesh Sugar Industries Limited",
  },
  {
    tickerSymbol: "DYCL",
    name: "Dynamic Cables Limited",
  },
  {
    tickerSymbol: "DYNAMATECH",
    name: "Dynamatic Technologies Limited",
  },
  {
    tickerSymbol: "DYNPRO",
    name: "Dynemic Products Limited",
  },
  {
    tickerSymbol: "E2E",
    name: "E2E Networks Limited",
  },
  {
    tickerSymbol: "EASEMYTRIP",
    name: "Easy Trip Planners Limited",
  },
  {
    tickerSymbol: "ECLERX",
    name: "eClerx Services Limited",
  },
  {
    tickerSymbol: "EDELWEISS",
    name: "Edelweiss Financial Services Limited",
  },
  {
    tickerSymbol: "EICHERMOT",
    name: "Eicher Motors Limited",
  },
  {
    tickerSymbol: "EIDPARRY",
    name: "EID Parry India Limited",
  },
  {
    tickerSymbol: "EIFFL",
    name: "Euro India Fresh Foods Limited",
  },
  {
    tickerSymbol: "EIHAHOTELS",
    name: "EIH Associated Hotels Limited",
  },
  {
    tickerSymbol: "EIHOTEL",
    name: "EIH Limited",
  },
  {
    tickerSymbol: "EIMCOELECO",
    name: "Eimco Elecon (India) Limited",
  },
  {
    tickerSymbol: "EKC",
    name: "Everest Kanto Cylinder Limited",
  },
  {
    tickerSymbol: "ELDEHSG",
    name: "Eldeco Housing And Industries Limited",
  },
  {
    tickerSymbol: "ELECON",
    name: "Elecon Engineering Company Limited",
  },
  {
    tickerSymbol: "ELECTCAST",
    name: "Electrosteel Castings Limited",
  },
  {
    tickerSymbol: "ELECTHERM",
    name: "Electrotherm (India) Limited",
  },
  {
    tickerSymbol: "ELGIEQUIP",
    name: "Elgi Equipments Limited",
  },
  {
    tickerSymbol: "ELGIRUBCO",
    name: "Elgi Rubber Company Limited",
  },
  {
    tickerSymbol: "ELIN",
    name: "Elin Electronics Limited",
  },
  {
    tickerSymbol: "EMAMILTD",
    name: "Emami Limited",
  },
  {
    tickerSymbol: "EMAMIPAP",
    name: "Emami Paper Mills Limited",
  },
  {
    tickerSymbol: "EMAMIREAL",
    name: "Emami Realty Limited",
  },
  {
    tickerSymbol: "EMIL",
    name: "Electronics Mart India Limited",
  },
  {
    tickerSymbol: "EMKAY",
    name: "Emkay Global Financial Services Limited",
  },
  {
    tickerSymbol: "EMMBI",
    name: "Emmbi Industries Limited",
  },
  {
    tickerSymbol: "EMUDHRA",
    name: "eMudhra Limited",
  },
  {
    tickerSymbol: "ENDURANCE",
    name: "Endurance Technologies Limited",
  },
  {
    tickerSymbol: "ENERGYDEV",
    name: "Energy Development Company Limited",
  },
  {
    tickerSymbol: "ENGINERSIN",
    name: "Engineers India Limited",
  },
  {
    tickerSymbol: "ENIL",
    name: "Entertainment Network (India) Limited",
  },
  {
    tickerSymbol: "EPL",
    name: "EPL Limited",
  },
  {
    tickerSymbol: "EQUITASBNK",
    name: "Equitas Small Finance Bank Limited",
  },
  {
    tickerSymbol: "ERIS",
    name: "Eris Lifesciences Limited",
  },
  {
    tickerSymbol: "EROSMEDIA",
    name: "Eros International Media Limited",
  },
  {
    tickerSymbol: "ESABINDIA",
    name: "Esab India Limited",
  },
  {
    tickerSymbol: "ESCORTS",
    name: "Escorts Kubota Limited",
  },
  {
    tickerSymbol: "ESSARSHPNG",
    name: "Essar Shipping Limited",
  },
  {
    tickerSymbol: "ESSENTIA",
    name: "Integra Essentia Limited",
  },
  {
    tickerSymbol: "ESTER",
    name: "Ester Industries Limited",
  },
  {
    tickerSymbol: "ETHOSLTD",
    name: "Ethos Limited",
  },
  {
    tickerSymbol: "EUROTEXIND",
    name: "Eurotex Industries and Exports Limited",
  },
  {
    tickerSymbol: "EVEREADY",
    name: "Eveready Industries India Limited",
  },
  {
    tickerSymbol: "EVERESTIND",
    name: "Everest Industries Limited",
  },
  {
    tickerSymbol: "EXCEL",
    name: "Excel Realty N Infra Limited",
  },
  {
    tickerSymbol: "EXCELINDUS",
    name: "Excel Industries Limited",
  },
  {
    tickerSymbol: "EXIDEIND",
    name: "Exide Industries Limited",
  },
  {
    tickerSymbol: "EXPLEOSOL",
    name: "Expleo Solutions Limited",
  },
  {
    tickerSymbol: "EXXARO",
    name: "Exxaro Tiles Limited",
  },
  {
    tickerSymbol: "FACT",
    name: "Fertilizers and Chemicals Travancore Limited",
  },
  {
    tickerSymbol: "FAIRCHEMOR",
    name: "Fairchem Organics Limited",
  },
  {
    tickerSymbol: "FAZE3Q",
    name: "Faze Three Limited",
  },
  {
    tickerSymbol: "FCL",
    name: "Fineotex Chemical Limited",
  },
  {
    tickerSymbol: "FCONSUMER",
    name: "Future Consumer Limited",
  },
  {
    tickerSymbol: "FCSSOFT",
    name: "FCS Software Solutions Limited",
  },
  {
    tickerSymbol: "FDC",
    name: "FDC Limited",
  },
  {
    tickerSymbol: "FEDERALBNK",
    name: "The Federal Bank  Limited",
  },
  {
    tickerSymbol: "FIBERWEB",
    name: "Fiberweb (India) Limited",
  },
  {
    tickerSymbol: "FIEMIND",
    name: "Fiem Industries Limited",
  },
  {
    tickerSymbol: "FILATEX",
    name: "Filatex India Limited",
  },
  {
    tickerSymbol: "FINCABLES",
    name: "Finolex Cables Limited",
  },
  {
    tickerSymbol: "FINEORG",
    name: "Fine Organic Industries Limited",
  },
  {
    tickerSymbol: "FINOPB",
    name: "Fino Payments Bank Limited",
  },
  {
    tickerSymbol: "FINPIPE",
    name: "Finolex Industries Limited",
  },
  {
    tickerSymbol: "FIVESTAR",
    name: "Five-Star Business Finance Limited",
  },
  {
    tickerSymbol: "FLEXITUFF",
    name: "Flexituff Ventures International Limited",
  },
  {
    tickerSymbol: "FLFL",
    name: "Future Lifestyle Fashions Limited",
  },
  {
    tickerSymbol: "FLUOROCHEM",
    name: "Gujarat Fluorochemicals Limited",
  },
  {
    tickerSymbol: "FMGOETZE",
    name: "Federal-Mogul Goetze (India) Limited.",
  },
  {
    tickerSymbol: "FMNL",
    name: "Future Market Networks Limited",
  },
  {
    tickerSymbol: "FOCUS",
    name: "Focus Lighting and Fixtures Limited",
  },
  {
    tickerSymbol: "FOODSIN",
    name: "Foods & Inns Limited",
  },
  {
    tickerSymbol: "FORCEMOT",
    name: "FORCE MOTORS LTD",
  },
  {
    tickerSymbol: "FORTIS",
    name: "Fortis Healthcare Limited",
  },
  {
    tickerSymbol: "FOSECOIND",
    name: "Foseco India Limited",
  },
  {
    tickerSymbol: "FSL",
    name: "Firstsource Solutions Limited",
  },
  {
    tickerSymbol: "FUSION",
    name: "Fusion Micro Finance Limited",
  },
  {
    tickerSymbol: "GABRIEL",
    name: "Gabriel India Limited",
  },
  {
    tickerSymbol: "GAEL",
    name: "Gujarat Ambuja Exports Limited",
  },
  {
    tickerSymbol: "GAIL",
    name: "GAIL (India) Limited",
  },
  {
    tickerSymbol: "GAL",
    name: "Gyscoal Alloys Limited",
  },
  {
    tickerSymbol: "GALAXYSURF",
    name: "Galaxy Surfactants Limited",
  },
  {
    tickerSymbol: "GALLANTT",
    name: "Gallantt Ispat Limited",
  },
  {
    tickerSymbol: "GANDHITUBE",
    name: "Gandhi Special Tubes Limited",
  },
  {
    tickerSymbol: "GANECOS",
    name: "Ganesha Ecosphere Limited",
  },
  {
    tickerSymbol: "GANESHBE",
    name: "Ganesh Benzoplast Limited",
  },
  {
    tickerSymbol: "GANESHHOUC",
    name: "Ganesh Housing Corporation Limited",
  },
  {
    tickerSymbol: "GANGAFORGE",
    name: "Ganga Forging Limited",
  },
  {
    tickerSymbol: "GANGESSECU",
    name: "Ganges Securities Limited",
  },
  {
    tickerSymbol: "GARFIBRES",
    name: "Garware Technical Fibres Limited",
  },
  {
    tickerSymbol: "GATEWAY",
    name: "Gateway Distriparks Limited",
  },
  {
    tickerSymbol: "GATI",
    name: "GATI Limited",
  },
  {
    tickerSymbol: "GAYAHWS",
    name: "Gayatri Highways Limited",
  },
  {
    tickerSymbol: "GEECEE",
    name: "GeeCee Ventures Limited",
  },
  {
    tickerSymbol: "GEEKAYWIRE",
    name: "Geekay Wires Limited",
  },
  {
    tickerSymbol: "GENCON",
    name: "Generic Engineering Construction and Projects Limited",
  },
  {
    tickerSymbol: "GENESYS",
    name: "Genesys International Corporation Limited",
  },
  {
    tickerSymbol: "GENUSPAPER",
    name: "Genus Paper & Boards Limited",
  },
  {
    tickerSymbol: "GENUSPOWER",
    name: "Genus Power Infrastructures Limited",
  },
  {
    tickerSymbol: "GEOJITFSL",
    name: "Geojit Financial Services Limited",
  },
  {
    tickerSymbol: "GEPIL",
    name: "GE Power India Limited",
  },
  {
    tickerSymbol: "GESHIP",
    name: "The Great Eastern Shipping Company Limited",
  },
  {
    tickerSymbol: "GET&D",
    name: "GE T&D India Limited",
  },
  {
    tickerSymbol: "GFLLIMITED",
    name: "GFL Limited",
  },
  {
    tickerSymbol: "GHCL",
    name: "GHCL Limited",
  },
  {
    tickerSymbol: "GICHSGFIN",
    name: "GIC Housing Finance Limited",
  },
  {
    tickerSymbol: "GICRE",
    name: "General Insurance Corporation of India",
  },
  {
    tickerSymbol: "GILLANDERS",
    name: "Gillanders Arbuthnot & Company Limited",
  },
  {
    tickerSymbol: "GILLETTE",
    name: "Gillette India Limited",
  },
  {
    tickerSymbol: "GINNIFILA",
    name: "Ginni Filaments Limited",
  },
  {
    tickerSymbol: "GIPCL",
    name: "Gujarat Industries Power Company Limited",
  },
  {
    tickerSymbol: "GISOLUTION",
    name: "GI Engineering Solutions Limited",
  },
  {
    tickerSymbol: "GKWLIMITED",
    name: "GKW Limited",
  },
  {
    tickerSymbol: "GLAND",
    name: "Gland Pharma Limited",
  },
  {
    tickerSymbol: "GLAXO",
    name: "GlaxoSmithKline Pharmaceuticals Limited",
  },
  {
    tickerSymbol: "GLENMARK",
    name: "Glenmark Pharmaceuticals Limited",
  },
  {
    tickerSymbol: "GLFL",
    name: "Gujarat Lease Financing Limited",
  },
  {
    tickerSymbol: "GLOBAL",
    name: "Global Education Limited",
  },
  {
    tickerSymbol: "GLOBALVECT",
    name: "Global Vectra Helicorp Limited",
  },
  {
    tickerSymbol: "GLOBE",
    name: "Globe Textiles (India) Limited",
  },
  {
    tickerSymbol: "GLOBUSSPR",
    name: "Globus Spirits Limited",
  },
  {
    tickerSymbol: "GLS",
    name: "Glenmark Life Sciences Limited",
  },
  {
    tickerSymbol: "GMBREW",
    name: "GM Breweries Limited",
  },
  {
    tickerSymbol: "GMDCLTD",
    name: "Gujarat Mineral Development Corporation Limited",
  },
  {
    tickerSymbol: "GMMPFAUDLR",
    name: "GMM Pfaudler Limited",
  },
  {
    tickerSymbol: "GMRINFRA",
    name: "GMR Airports Infrastructure Limited",
  },
  {
    tickerSymbol: "GMRP&UI",
    name: "GMR Power and Urban Infra Limited",
  },
  {
    tickerSymbol: "GNA",
    name: "GNA Axles Limited",
  },
  {
    tickerSymbol: "GNFC",
    name: "Gujarat Narmada Valley Fertilizers and Chemicals Limited",
  },
  {
    tickerSymbol: "GOACARBON",
    name: "Goa Carbon Limited",
  },
  {
    tickerSymbol: "GOCLCORP",
    name: "GOCL Corporation Limited",
  },
  {
    tickerSymbol: "GOCOLORS",
    name: "Go Fashion (India) Limited",
  },
  {
    tickerSymbol: "GODFRYPHLP",
    name: "Godfrey Phillips India Limited",
  },
  {
    tickerSymbol: "GODHA",
    name: "Godha Cabcon & Insulation Limited",
  },
  {
    tickerSymbol: "GODREJAGRO",
    name: "Godrej Agrovet Limited",
  },
  {
    tickerSymbol: "GODREJCP",
    name: "Godrej Consumer Products Limited",
  },
  {
    tickerSymbol: "GODREJIND",
    name: "Godrej Industries Limited",
  },
  {
    tickerSymbol: "GODREJPROP",
    name: "Godrej Properties Limited",
  },
  {
    tickerSymbol: "GOKEX",
    name: "Gokaldas Exports Limited",
  },
  {
    tickerSymbol: "GOKUL",
    name: "Gokul Refoils and Solvent Limited",
  },
  {
    tickerSymbol: "GOKULAGRO",
    name: "Gokul Agro Resources Limited",
  },
  {
    tickerSymbol: "GOLDIAM",
    name: "Goldiam International Limited",
  },
  {
    tickerSymbol: "GOLDTECH",
    name: "Goldstone Technologies Limited",
  },
  {
    tickerSymbol: "GOODLUCK",
    name: "Goodluck India Limited",
  },
  {
    tickerSymbol: "GOODYEAR",
    name: "Goodyear India Limited",
  },
  {
    tickerSymbol: "GOYALALUM",
    name: "Goyal Aluminiums Limited",
  },
  {
    tickerSymbol: "GPIL",
    name: "Godawari Power And Ispat limited",
  },
  {
    tickerSymbol: "GPPL",
    name: "Gujarat Pipavav Port Limited",
  },
  {
    tickerSymbol: "GPTINFRA",
    name: "GPT Infraprojects Limited",
  },
  {
    tickerSymbol: "GRANULES",
    name: "Granules India Limited",
  },
  {
    tickerSymbol: "GRAPHITE",
    name: "Graphite India Limited",
  },
  {
    tickerSymbol: "GRASIM",
    name: "Grasim Industries Limited",
  },
  {
    tickerSymbol: "GRAUWEIL",
    name: "Grauer & Weil (India) Limited",
  },
  {
    tickerSymbol: "GRAVITA",
    name: "Gravita India Limited",
  },
  {
    tickerSymbol: "GREAVESCOT",
    name: "Greaves Cotton Limited",
  },
  {
    tickerSymbol: "GREENLAM",
    name: "Greenlam Industries Limited",
  },
  {
    tickerSymbol: "GREENPANEL",
    name: "Greenpanel Industries Limited",
  },
  {
    tickerSymbol: "GREENPLY",
    name: "Greenply Industries Limited",
  },
  {
    tickerSymbol: "GREENPOWER",
    name: "Orient Green Power Company Limited",
  },
  {
    tickerSymbol: "GRINDWELL",
    name: "Grindwell Norton Limited",
  },
  {
    tickerSymbol: "GRINFRA",
    name: "G R Infraprojects Limited",
  },
  {
    tickerSymbol: "GRMOVER",
    name: "GRM Overseas Limited",
  },
  {
    tickerSymbol: "GROBTEA",
    name: "The Grob Tea Company Limited",
  },
  {
    tickerSymbol: "GRPLTD",
    name: "GRP Limited",
  },
  {
    tickerSymbol: "GRSE",
    name: "Garden Reach Shipbuilders & Engineers Limited",
  },
  {
    tickerSymbol: "GRWRHITECH",
    name: "Garware Hi-Tech Films Limited",
  },
  {
    tickerSymbol: "GSFC",
    name: "Gujarat State Fertilizers & Chemicals Limited",
  },
  {
    tickerSymbol: "GSLSU",
    name: "Global Surfaces Limited",
  },
  {
    tickerSymbol: "GSPL",
    name: "Gujarat State Petronet Limited",
  },
  {
    tickerSymbol: "GSS",
    name: "GSS Infotech Limited",
  },
  {
    tickerSymbol: "GTL",
    name: "GTL Limited",
  },
  {
    tickerSymbol: "GTLINFRA",
    name: "GTL Infrastructure Limited",
  },
  {
    tickerSymbol: "GTPL",
    name: "GTPL Hathway Limited",
  },
  {
    tickerSymbol: "GUFICBIO",
    name: "Gufic Biosciences Limited",
  },
  {
    tickerSymbol: "GUJALKALI",
    name: "Gujarat Alkalies and Chemicals Limited",
  },
  {
    tickerSymbol: "GUJAPOLLO",
    name: "Gujarat Apollo Industries Limited",
  },
  {
    tickerSymbol: "GUJGASLTD",
    name: "Gujarat Gas Limited",
  },
  {
    tickerSymbol: "GUJRAFFIA",
    name: "Gujarat Raffia Industries Limited",
  },
  {
    tickerSymbol: "GULFOILLUB",
    name: "Gulf Oil Lubricants India Limited",
  },
  {
    tickerSymbol: "GULFPETRO",
    name: "GP Petroleums Limited",
  },
  {
    tickerSymbol: "GULPOLY",
    name: "Gulshan Polyols Limited",
  },
  {
    tickerSymbol: "GVKPIL",
    name: "GVK Power & Infrastructure Limited",
  },
  {
    tickerSymbol: "HAL",
    name: "Hindustan Aeronautics Limited",
  },
  {
    tickerSymbol: "HAPPSTMNDS",
    name: "Happiest Minds Technologies Limited",
  },
  {
    tickerSymbol: "HARDWYN",
    name: "Hardwyn India Limited",
  },
  {
    tickerSymbol: "HARIOMPIPE",
    name: "Hariom Pipe Industries Limited",
  },
  {
    tickerSymbol: "HARRMALAYA",
    name: "Harrisons  Malayalam Limited",
  },
  {
    tickerSymbol: "HARSHA",
    name: "Harsha Engineers International Limited",
  },
  {
    tickerSymbol: "HATHWAY",
    name: "Hathway Cable & Datacom Limited",
  },
  {
    tickerSymbol: "HATSUN",
    name: "Hatsun Agro Product Limited",
  },
  {
    tickerSymbol: "HAVELLS",
    name: "Havells India Limited",
  },
  {
    tickerSymbol: "HAVISHA",
    name: "Sri Havisha Hospitality and Infrastructure Limited",
  },
  {
    tickerSymbol: "HBLPOWER",
    name: "HBL Power Systems Limited",
  },
  {
    tickerSymbol: "HBSL",
    name: "HB Stockholdings Limited",
  },
  {
    tickerSymbol: "HCC",
    name: "Hindustan Construction Company Limited",
  },
  {
    tickerSymbol: "HCG",
    name: "Healthcare Global Enterprises Limited",
  },
  {
    tickerSymbol: "HCL-INSYS",
    name: "HCL Infosystems Limited",
  },
  {
    tickerSymbol: "HCLTECH",
    name: "HCL Technologies Limited",
  },
  {
    tickerSymbol: "HDFC",
    name: "Housing Development Finance Corporation Limited",
  },
  {
    tickerSymbol: "HDFCAMC",
    name: "HDFC Asset Management Company Limited",
  },
  {
    tickerSymbol: "HDFCBANK",
    name: "HDFC Bank Limited",
  },
  {
    tickerSymbol: "HDFCLIFE",
    name: "HDFC Life Insurance Company Limited",
  },
  {
    tickerSymbol: "HEADSUP",
    name: "Heads UP Ventures Limited",
  },
  {
    tickerSymbol: "HECPROJECT",
    name: "HEC Infra Projects Limited",
  },
  {
    tickerSymbol: "HEG",
    name: "HEG Limited",
  },
  {
    tickerSymbol: "HEIDELBERG",
    name: "HeidelbergCement India Limited",
  },
  {
    tickerSymbol: "HEMIPROP",
    name: "Hemisphere Properties India Limited",
  },
  {
    tickerSymbol: "HERANBA",
    name: "Heranba Industries Limited",
  },
  {
    tickerSymbol: "HERCULES",
    name: "Hercules Hoists Limited",
  },
  {
    tickerSymbol: "HERITGFOOD",
    name: "Heritage Foods Limited",
  },
  {
    tickerSymbol: "HEROMOTOCO",
    name: "Hero MotoCorp Limited",
  },
  {
    tickerSymbol: "HESTERBIO",
    name: "Hester Biosciences Limited",
  },
  {
    tickerSymbol: "HEUBACHIND",
    name: "Heubach Colorants India Limited",
  },
  {
    tickerSymbol: "HEXATRADEX",
    name: "Hexa Tradex Limited",
  },
  {
    tickerSymbol: "HFCL",
    name: "HFCL Limited",
  },
  {
    tickerSymbol: "HGINFRA",
    name: "H.G. Infra Engineering Limited",
  },
  {
    tickerSymbol: "HGS",
    name: "Hinduja Global Solutions Limited",
  },
  {
    tickerSymbol: "HIKAL",
    name: "Hikal Limited",
  },
  {
    tickerSymbol: "HIL",
    name: "HIL Limited",
  },
  {
    tickerSymbol: "HILTON",
    name: "Hilton Metal Forging Limited",
  },
  {
    tickerSymbol: "HIMATSEIDE",
    name: "Himatsingka Seide Limited",
  },
  {
    tickerSymbol: "HINDALCO",
    name: "Hindalco Industries Limited",
  },
  {
    tickerSymbol: "HINDCOMPOS",
    name: "Hindustan Composites Limited",
  },
  {
    tickerSymbol: "HINDCON",
    name: "Hindcon Chemicals Limited",
  },
  {
    tickerSymbol: "HINDCOPPER",
    name: "Hindustan Copper Limited",
  },
  {
    tickerSymbol: "HINDMOTORS",
    name: "Hindustan Motors Limited",
  },
  {
    tickerSymbol: "HINDOILEXP",
    name: "Hindustan Oil Exploration Company Limited",
  },
  {
    tickerSymbol: "HINDPETRO",
    name: "Hindustan Petroleum Corporation Limited",
  },
  {
    tickerSymbol: "HINDUNILVR",
    name: "Hindustan Unilever Limited",
  },
  {
    tickerSymbol: "HINDWAREAP",
    name: "Hindware Home Innovation Limited",
  },
  {
    tickerSymbol: "HINDZINC",
    name: "Hindustan Zinc Limited",
  },
  {
    tickerSymbol: "HIRECT",
    name: "Hind Rectifiers Limited",
  },
  {
    tickerSymbol: "HISARMETAL",
    name: "Hisar Metal Industries Limited",
  },
  {
    tickerSymbol: "HITECH",
    name: "Hi-Tech Pipes Limited",
  },
  {
    tickerSymbol: "HITECHCORP",
    name: "Hitech Corporation Limited",
  },
  {
    tickerSymbol: "HITECHGEAR",
    name: "The Hi-Tech Gears Limited",
  },
  {
    tickerSymbol: "HLEGLAS",
    name: "HLE Glascoat Limited",
  },
  {
    tickerSymbol: "HLVLTD",
    name: "HLV LIMITED",
  },
  {
    tickerSymbol: "HMT",
    name: "HMT Limited",
  },
  {
    tickerSymbol: "HMVL",
    name: "Hindustan Media Ventures Limited",
  },
  {
    tickerSymbol: "HNDFDS",
    name: "Hindustan Foods Limited",
  },
  {
    tickerSymbol: "HOMEFIRST",
    name: "Home First Finance Company India Limited",
  },
  {
    tickerSymbol: "HONAUT",
    name: "Honeywell Automation India Limited",
  },
  {
    tickerSymbol: "HONDAPOWER",
    name: "Honda India Power Products Limited",
  },
  {
    tickerSymbol: "HOVS",
    name: "HOV Services Limited",
  },
  {
    tickerSymbol: "HPAL",
    name: "HP Adhesives Limited",
  },
  {
    tickerSymbol: "HPIL",
    name: "Hindprakash Industries Limited",
  },
  {
    tickerSymbol: "HPL",
    name: "HPL Electric & Power Limited",
  },
  {
    tickerSymbol: "HSCL",
    name: "Himadri Speciality Chemical Limited",
  },
  {
    tickerSymbol: "HTMEDIA",
    name: "HT Media Limited",
  },
  {
    tickerSymbol: "HUBTOWN",
    name: "Hubtown Limited",
  },
  {
    tickerSymbol: "HUDCO",
    name: "Housing & Urban Development Corporation Limited",
  },
  {
    tickerSymbol: "HUHTAMAKI",
    name: "Huhtamaki India Limited",
  },
  {
    tickerSymbol: "HYBRIDFIN",
    name: "Hybrid Financial Services Limited",
  },
  {
    tickerSymbol: "IBREALEST",
    name: "Indiabulls Real Estate Limited",
  },
  {
    tickerSymbol: "IBULHSGFIN",
    name: "Indiabulls Housing Finance Limited",
  },
  {
    tickerSymbol: "ICDSLTD",
    name: "ICDS Limited",
  },
  {
    tickerSymbol: "ICEMAKE",
    name: "Ice Make Refrigeration Limited",
  },
  {
    tickerSymbol: "ICICIBANK",
    name: "ICICI Bank Limited",
  },
  {
    tickerSymbol: "ICICIGI",
    name: "ICICI Lombard General Insurance Company Limited",
  },
  {
    tickerSymbol: "ICICIPRULI",
    name: "ICICI Prudential Life Insurance Company Limited",
  },
  {
    tickerSymbol: "ICIL",
    name: "Indo Count Industries Limited",
  },
  {
    tickerSymbol: "ICRA",
    name: "ICRA Limited",
  },
  {
    tickerSymbol: "IDBI",
    name: "IDBI Bank Limited",
  },
  {
    tickerSymbol: "IDEA",
    name: "Vodafone Idea Limited",
  },
  {
    tickerSymbol: "IDFC",
    name: "IDFC Limited",
  },
  {
    tickerSymbol: "IDFCFIRSTB",
    name: "IDFC First Bank Limited",
  },
  {
    tickerSymbol: "IEL",
    name: "Indiabulls Enterprises Limited",
  },
  {
    tickerSymbol: "IEX",
    name: "Indian Energy Exchange Limited",
  },
  {
    tickerSymbol: "IFBAGRO",
    name: "IFB Agro Industries Limited",
  },
  {
    tickerSymbol: "IFBIND",
    name: "IFB Industries Limited",
  },
  {
    tickerSymbol: "IFCI",
    name: "IFCI Limited",
  },
  {
    tickerSymbol: "IFGLEXPOR",
    name: "IFGL Refractories Limited",
  },
  {
    tickerSymbol: "IGARASHI",
    name: "Igarashi Motors India Limited",
  },
  {
    tickerSymbol: "IGL",
    name: "Indraprastha Gas Limited",
  },
  {
    tickerSymbol: "IGPL",
    name: "IG Petrochemicals Limited",
  },
  {
    tickerSymbol: "IIFL",
    name: "IIFL Finance Limited",
  },
  {
    tickerSymbol: "IIFLSEC",
    name: "IIFL Securities Limited",
  },
  {
    tickerSymbol: "IITL",
    name: "Industrial Investment Trust Limited",
  },
  {
    tickerSymbol: "IL&FSENGG",
    name: "IL&FS Engineering and Construction Company Limited",
  },
  {
    tickerSymbol: "IL&FSTRANS",
    name: "IL&FS Transportation Networks Limited",
  },
  {
    tickerSymbol: "IMAGICAA",
    name: "Imagicaaworld Entertainment Limited",
  },
  {
    tickerSymbol: "IMFA",
    name: "Indian Metals & Ferro Alloys Limited",
  },
  {
    tickerSymbol: "IMPAL",
    name: "India Motor Parts and Accessories Limited",
  },
  {
    tickerSymbol: "IMPEXFERRO",
    name: "Impex Ferro Tech Limited",
  },
  {
    tickerSymbol: "INCREDIBLE",
    name: "INCREDIBLE INDUSTRIES LIMITED",
  },
  {
    tickerSymbol: "INDBANK",
    name: "Indbank Merchant Banking Services Limited",
  },
  {
    tickerSymbol: "INDHOTEL",
    name: "The Indian Hotels Company Limited",
  },
  {
    tickerSymbol: "INDIACEM",
    name: "The India Cements Limited",
  },
  {
    tickerSymbol: "INDIAGLYCO",
    name: "India Glycols Limited",
  },
  {
    tickerSymbol: "INDIAMART",
    name: "Indiamart Intermesh Limited",
  },
  {
    tickerSymbol: "INDIANB",
    name: "Indian Bank",
  },
  {
    tickerSymbol: "INDIANCARD",
    name: "Indian Card Clothing Company Limited",
  },
  {
    tickerSymbol: "INDIANHUME",
    name: "Indian Hume Pipe Company Limited",
  },
  {
    tickerSymbol: "INDIGO",
    name: "InterGlobe Aviation Limited",
  },
  {
    tickerSymbol: "INDIGOPNTS",
    name: "Indigo Paints Limited",
  },
  {
    tickerSymbol: "INDNIPPON",
    name: "India Nippon Electricals Limited",
  },
  {
    tickerSymbol: "INDOAMIN",
    name: "Indo Amines Limited",
  },
  {
    tickerSymbol: "INDOBORAX",
    name: "Indo Borax & Chemicals Limited",
  },
  {
    tickerSymbol: "INDOCO",
    name: "Indoco Remedies Limited",
  },
  {
    tickerSymbol: "INDORAMA",
    name: "Indo Rama Synthetics (India) Limited",
  },
  {
    tickerSymbol: "INDOSTAR",
    name: "IndoStar Capital Finance Limited",
  },
  {
    tickerSymbol: "INDOTECH",
    name: "Indo Tech Transformers Limited",
  },
  {
    tickerSymbol: "INDOTHAI",
    name: "Indo Thai Securities Limited",
  },
  {
    tickerSymbol: "INDOWIND",
    name: "Indowind Energy Limited",
  },
  {
    tickerSymbol: "INDRAMEDCO",
    name: "Indraprastha Medical Corporation Limited",
  },
  {
    tickerSymbol: "INDSWFTLAB",
    name: "Ind-Swift Laboratories Limited",
  },
  {
    tickerSymbol: "INDSWFTLTD",
    name: "Ind-Swift Limited",
  },
  {
    tickerSymbol: "INDTERRAIN",
    name: "Indian Terrain Fashions Limited",
  },
  {
    tickerSymbol: "INDUSINDBK",
    name: "IndusInd Bank Limited",
  },
  {
    tickerSymbol: "INDUSTOWER",
    name: "Indus Towers Limited",
  },
  {
    tickerSymbol: "INFIBEAM",
    name: "Infibeam Avenues Limited",
  },
  {
    tickerSymbol: "INFOBEAN",
    name: "InfoBeans Technologies Limited",
  },
  {
    tickerSymbol: "INFOMEDIA",
    name: "Infomedia Press Limited",
  },
  {
    tickerSymbol: "INFY",
    name: "Infosys Limited",
  },
  {
    tickerSymbol: "INGERRAND",
    name: "Ingersoll Rand (India) Limited",
  },
  {
    tickerSymbol: "INOXGREEN",
    name: "Inox Green Energy Services Limited",
  },
  {
    tickerSymbol: "INOXWIND",
    name: "Inox Wind Limited",
  },
  {
    tickerSymbol: "INSECTICID",
    name: "Insecticides (India) Limited",
  },
  {
    tickerSymbol: "INSPIRISYS",
    name: "Inspirisys Solutions Limited",
  },
  {
    tickerSymbol: "INTELLECT",
    name: "Intellect Design Arena Limited",
  },
  {
    tickerSymbol: "INTENTECH",
    name: "Intense Technologies Limited",
  },
  {
    tickerSymbol: "INTLCONV",
    name: "International Conveyors Limited",
  },
  {
    tickerSymbol: "INVENTURE",
    name: "Inventure Growth & Securities Limited",
  },
  {
    tickerSymbol: "IOB",
    name: "Indian Overseas Bank",
  },
  {
    tickerSymbol: "IOC",
    name: "Indian Oil Corporation Limited",
  },
  {
    tickerSymbol: "IOLCP",
    name: "IOL Chemicals and Pharmaceuticals Limited",
  },
  {
    tickerSymbol: "IONEXCHANG",
    name: "ION Exchange (India) Limited",
  },
  {
    tickerSymbol: "IPCALAB",
    name: "IPCA Laboratories Limited",
  },
  {
    tickerSymbol: "IPL",
    name: "India Pesticides Limited",
  },
  {
    tickerSymbol: "IRB",
    name: "IRB Infrastructure Developers Limited",
  },
  {
    tickerSymbol: "IRCON",
    name: "Ircon International Limited",
  },
  {
    tickerSymbol: "IRCTC",
    name: "Indian Railway Catering And Tourism Corporation Limited",
  },
  {
    tickerSymbol: "IRFC",
    name: "Indian Railway Finance Corporation Limited",
  },
  {
    tickerSymbol: "IRIS",
    name: "Iris Business Services Limited",
  },
  {
    tickerSymbol: "IRISDOREME",
    name: "Iris Clothings Limited",
  },
  {
    tickerSymbol: "ISEC",
    name: "ICICI Securities Limited",
  },
  {
    tickerSymbol: "ISFT",
    name: "Intrasoft Technologies Limited",
  },
  {
    tickerSymbol: "ISGEC",
    name: "Isgec Heavy Engineering Limited",
  },
  {
    tickerSymbol: "ISMTLTD",
    name: "ISMT Limited",
  },
  {
    tickerSymbol: "ITC",
    name: "ITC Limited",
  },
  {
    tickerSymbol: "ITDC",
    name: "India Tourism Development Corporation Limited",
  },
  {
    tickerSymbol: "ITDCEM",
    name: "ITD Cementation India Limited",
  },
  {
    tickerSymbol: "ITI",
    name: "ITI Limited",
  },
  {
    tickerSymbol: "IVC",
    name: "IL&FS Investment Managers Limited",
  },
  {
    tickerSymbol: "IVP",
    name: "IVP Limited",
  },
  {
    tickerSymbol: "IWEL",
    name: "Inox Wind Energy Limited",
  },
  {
    tickerSymbol: "IZMO",
    name: "IZMO Limited",
  },
  {
    tickerSymbol: "J&KBANK",
    name: "The Jammu & Kashmir Bank Limited",
  },
  {
    tickerSymbol: "JAGRAN",
    name: "Jagran Prakashan Limited",
  },
  {
    tickerSymbol: "JAGSNPHARM",
    name: "Jagsonpal Pharmaceuticals Limited",
  },
  {
    tickerSymbol: "JAIBALAJI",
    name: "Jai Balaji Industries Limited",
  },
  {
    tickerSymbol: "JAICORPLTD",
    name: "Jai Corp Limited",
  },
  {
    tickerSymbol: "JAIPURKURT",
    name: "Nandani Creation Limited",
  },
  {
    tickerSymbol: "JAMNAAUTO",
    name: "Jamna Auto Industries Limited",
  },
  {
    tickerSymbol: "JASH",
    name: "Jash Engineering Limited",
  },
  {
    tickerSymbol: "JAYAGROGN",
    name: "Jayant Agro Organics Limited",
  },
  {
    tickerSymbol: "JAYBARMARU",
    name: "Jay Bharat Maruti Limited",
  },
  {
    tickerSymbol: "JAYNECOIND",
    name: "Jayaswal Neco Industries Limited",
  },
  {
    tickerSymbol: "JAYSREETEA",
    name: "Jayshree Tea & Industries Limited",
  },
  {
    tickerSymbol: "JBCHEPHARM",
    name: "JB Chemicals & Pharmaceuticals Limited",
  },
  {
    tickerSymbol: "JBMA",
    name: "JBM Auto Limited",
  },
  {
    tickerSymbol: "JCHAC",
    name: "Johnson Controls - Hitachi Air Conditioning India Limited",
  },
  {
    tickerSymbol: "JETAIRWAYS",
    name: "Jet Airways (India) Limited",
  },
  {
    tickerSymbol: "JETFREIGHT",
    name: "Jet Freight Logistics Limited",
  },
  {
    tickerSymbol: "JHS",
    name: "JHS Svendgaard Laboratories Limited",
  },
  {
    tickerSymbol: "JINDALPHOT",
    name: "Jindal Photo Limited",
  },
  {
    tickerSymbol: "JINDALPOLY",
    name: "Jindal Poly Films Limited",
  },
  {
    tickerSymbol: "JINDALSAW",
    name: "Jindal Saw Limited",
  },
  {
    tickerSymbol: "JINDALSTEL",
    name: "Jindal Steel & Power Limited",
  },
  {
    tickerSymbol: "JINDRILL",
    name: "Jindal Drilling And Industries Limited",
  },
  {
    tickerSymbol: "JINDWORLD",
    name: "Jindal Worldwide Limited",
  },
  {
    tickerSymbol: "JISLDVREQS",
    name: "Jain Irrigation Systems Limited(2)",
  },
  {
    tickerSymbol: "JISLJALEQS",
    name: "Jain Irrigation Systems Limited",
  },
  {
    tickerSymbol: "JITFINFRA",
    name: "JITF Infralogistics Limited",
  },
  {
    tickerSymbol: "JKCEMENT",
    name: "JK Cement Limited",
  },
  {
    tickerSymbol: "JKIL",
    name: "J.Kumar Infraprojects Limited",
  },
  {
    tickerSymbol: "JKLAKSHMI",
    name: "JK Lakshmi Cement Limited",
  },
  {
    tickerSymbol: "JKPAPER",
    name: "JK Paper Limited",
  },
  {
    tickerSymbol: "JKTYRE",
    name: "JK Tyre & Industries Limited",
  },
  {
    tickerSymbol: "JMA",
    name: "Jullundur Motor Agency (Delhi) Limited",
  },
  {
    tickerSymbol: "JMFINANCIL",
    name: "JM Financial Limited",
  },
  {
    tickerSymbol: "JOCIL",
    name: "Jocil Limited",
  },
  {
    tickerSymbol: "JPASSOCIAT",
    name: "Jaiprakash Associates Limited",
  },
  {
    tickerSymbol: "JPOLYINVST",
    name: "Jindal Poly Investment and Finance Company Limited",
  },
  {
    tickerSymbol: "JPPOWER",
    name: "Jaiprakash Power Ventures Limited",
  },
  {
    tickerSymbol: "JSL",
    name: "Jindal Stainless Limited",
  },
  {
    tickerSymbol: "JSWENERGY",
    name: "JSW Energy Limited",
  },
  {
    tickerSymbol: "JSWHL",
    name: "JSW Holdings Limited",
  },
  {
    tickerSymbol: "JSWISPL",
    name: "JSW Ispat Special Products Limited",
  },
  {
    tickerSymbol: "JSWSTEEL",
    name: "JSW Steel Limited",
  },
  {
    tickerSymbol: "JTEKTINDIA",
    name: "Jtekt India Limited",
  },
  {
    tickerSymbol: "JTLIND",
    name: "JTL INDUSTRIES LIMITED",
  },
  {
    tickerSymbol: "JUBLFOOD",
    name: "Jubilant Foodworks Limited",
  },
  {
    tickerSymbol: "JUBLINDS",
    name: "Jubilant Industries Limited",
  },
  {
    tickerSymbol: "JUBLINGREA",
    name: "Jubilant Ingrevia Limited",
  },
  {
    tickerSymbol: "JUBLPHARMA",
    name: "Jubilant Pharmova Limited",
  },
  {
    tickerSymbol: "JUSTDIAL",
    name: "Just Dial Limited",
  },
  {
    tickerSymbol: "JWL",
    name: "Jupiter Wagons Limited",
  },
  {
    tickerSymbol: "JYOTHYLAB",
    name: "Jyothy Labs Limited",
  },
  {
    tickerSymbol: "JYOTISTRUC",
    name: "Jyoti Structures Limited",
  },
  {
    tickerSymbol: "KABRAEXTRU",
    name: "Kabra Extrusion Technik Limited",
  },
  {
    tickerSymbol: "KAJARIACER",
    name: "Kajaria Ceramics Limited",
  },
  {
    tickerSymbol: "KAKATCEM",
    name: "Kakatiya Cement Sugar & Industries Limited",
  },
  {
    tickerSymbol: "KALPATPOWR",
    name: "Kalpataru Power Transmission Limited",
  },
  {
    tickerSymbol: "KALYANI",
    name: "Kalyani Commercials Limited",
  },
  {
    tickerSymbol: "KALYANIFRG",
    name: "Kalyani Forge Limited",
  },
  {
    tickerSymbol: "KALYANKJIL",
    name: "Kalyan Jewellers India Limited",
  },
  {
    tickerSymbol: "KAMATHOTEL",
    name: "Kamat Hotels (I) Limited",
  },
  {
    tickerSymbol: "KAMDHENU",
    name: "Kamdhenu Limited",
  },
  {
    tickerSymbol: "KAMOPAINTS",
    name: "Kamdhenu Ventures Limited",
  },
  {
    tickerSymbol: "KANANIIND",
    name: "Kanani Industries Limited",
  },
  {
    tickerSymbol: "KANORICHEM",
    name: "Kanoria Chemicals & Industries Limited",
  },
  {
    tickerSymbol: "KANPRPLA",
    name: "Kanpur Plastipack Limited",
  },
  {
    tickerSymbol: "KANSAINER",
    name: "Kansai Nerolac Paints Limited",
  },
  {
    tickerSymbol: "KAPSTON",
    name: "Kapston Services Limited",
  },
  {
    tickerSymbol: "KARMAENG",
    name: "Karma Energy Limited",
  },
  {
    tickerSymbol: "KARURVYSYA",
    name: "Karur Vysya Bank Limited",
  },
  {
    tickerSymbol: "KAUSHALYA",
    name: "Kaushalya Infrastructure Development Corporation Limited",
  },
  {
    tickerSymbol: "KAVVERITEL",
    name: "Kavveri Telecom Products Limited",
  },
  {
    tickerSymbol: "KAYA",
    name: "Kaya Limited",
  },
  {
    tickerSymbol: "KAYNES",
    name: "Kaynes Technology India Limited",
  },
  {
    tickerSymbol: "KBCGLOBAL",
    name: "KBC Global Limited",
  },
  {
    tickerSymbol: "KCP",
    name: "KCP Limited",
  },
  {
    tickerSymbol: "KCPSUGIND",
    name: "KCP Sugar and Industries Corporation Limited",
  },
  {
    tickerSymbol: "KDDL",
    name: "KDDL Limited",
  },
  {
    tickerSymbol: "KEC",
    name: "KEC International Limited",
  },
  {
    tickerSymbol: "KECL",
    name: "Kirloskar Electric Company Limited",
  },
  {
    tickerSymbol: "KEEPLEARN",
    name: "DSJ Keep Learning Limited",
  },
  {
    tickerSymbol: "KEI",
    name: "KEI Industries Limited",
  },
  {
    tickerSymbol: "KELLTONTEC",
    name: "Kellton Tech Solutions Limited",
  },
  {
    tickerSymbol: "KENNAMET",
    name: "Kennametal India Limited",
  },
  {
    tickerSymbol: "KERNEX",
    name: "Kernex Microsystems (India) Limited",
  },
  {
    tickerSymbol: "KESORAMIND",
    name: "Kesoram Industries Limited",
  },
  {
    tickerSymbol: "KEYFINSERV",
    name: "Keynote Financial Services Limited",
  },
  {
    tickerSymbol: "KFINTECH",
    name: "Kfin Technologies Limited",
  },
  {
    tickerSymbol: "KHADIM",
    name: "Khadim India Limited",
  },
  {
    tickerSymbol: "KHAICHEM",
    name: "Khaitan Chemicals & Fertilizers Limited",
  },
  {
    tickerSymbol: "KHAITANLTD",
    name: "Khaitan (India) Limited",
  },
  {
    tickerSymbol: "KHANDSE",
    name: "Khandwala Securities Limited",
  },
  {
    tickerSymbol: "KICL",
    name: "Kalyani Investment Company Limited",
  },
  {
    tickerSymbol: "KILITCH",
    name: "Kilitch Drugs (India) Limited",
  },
  {
    tickerSymbol: "KIMS",
    name: "Krishna Institute of Medical Sciences Limited",
  },
  {
    tickerSymbol: "KINGFA",
    name: "Kingfa Science & Technology (India) Limited",
  },
  {
    tickerSymbol: "KIOCL",
    name: "KIOCL Limited",
  },
  {
    tickerSymbol: "KIRIINDUS",
    name: "Kiri Industries Limited",
  },
  {
    tickerSymbol: "KIRLFER",
    name: "Kirloskar Ferrous Industries Ltd",
  },
  {
    tickerSymbol: "KIRLOSBROS",
    name: "Kirloskar Brothers Limited",
  },
  {
    tickerSymbol: "KIRLOSENG",
    name: "Kirloskar Oil Engines Limited",
  },
  {
    tickerSymbol: "KIRLOSIND",
    name: "Kirloskar Industries Limited",
  },
  {
    tickerSymbol: "KIRLPNU",
    name: "Kirloskar Pneumatic Company Limited",
  },
  {
    tickerSymbol: "KITEX",
    name: "Kitex Garments Limited",
  },
  {
    tickerSymbol: "KKCL",
    name: "Kewal Kiran Clothing Limited",
  },
  {
    tickerSymbol: "KMSUGAR",
    name: "K.M.Sugar Mills Limited",
  },
  {
    tickerSymbol: "KNRCON",
    name: "KNR Constructions Limited",
  },
  {
    tickerSymbol: "KOHINOOR",
    name: "Kohinoor Foods Limited",
  },
  {
    tickerSymbol: "KOKUYOCMLN",
    name: "Kokuyo Camlin Limited",
  },
  {
    tickerSymbol: "KOLTEPATIL",
    name: "Kolte - Patil Developers Limited",
  },
  {
    tickerSymbol: "KOPRAN",
    name: "Kopran Limited",
  },
  {
    tickerSymbol: "KOTAKBANK",
    name: "Kotak Mahindra Bank Limited",
  },
  {
    tickerSymbol: "KOTARISUG",
    name: "Kothari Sugars And Chemicals Limited",
  },
  {
    tickerSymbol: "KOTHARIPET",
    name: "Kothari Petrochemicals Limited",
  },
  {
    tickerSymbol: "KOTHARIPRO",
    name: "Kothari Products Limited",
  },
  {
    tickerSymbol: "KOVAI",
    name: "Kovai Medical Center and Hospital Limited",
  },
  {
    tickerSymbol: "KPIGREEN",
    name: "KPI Green Energy Limited",
  },
  {
    tickerSymbol: "KPITTECH",
    name: "KPIT Technologies Limited",
  },
  {
    tickerSymbol: "KPRMILL",
    name: "K.P.R. Mill Limited",
  },
  {
    tickerSymbol: "KRBL",
    name: "KRBL Limited",
  },
  {
    tickerSymbol: "KREBSBIO",
    name: "Krebs Biochemicals and Industries Limited",
  },
  {
    tickerSymbol: "KRIDHANINF",
    name: "Kridhan Infra Limited",
  },
  {
    tickerSymbol: "KRISHANA",
    name: "Krishana Phoschem Limited",
  },
  {
    tickerSymbol: "KRITI",
    name: "Kriti Industries (India) Limited",
  },
  {
    tickerSymbol: "KRITIKA",
    name: "Kritika Wires Limited",
  },
  {
    tickerSymbol: "KRITINUT",
    name: "Kriti Nutrients Limited",
  },
  {
    tickerSymbol: "KRSNAA",
    name: "Krsnaa Diagnostics Limited",
  },
  {
    tickerSymbol: "KSB",
    name: "Ksb Limited",
  },
  {
    tickerSymbol: "KSCL",
    name: "Kaveri Seed Company Limited",
  },
  {
    tickerSymbol: "KSHITIJPOL",
    name: "Kshitij Polyline Limited",
  },
  {
    tickerSymbol: "KSL",
    name: "Kalyani Steels Limited",
  },
  {
    tickerSymbol: "KSOLVES",
    name: "Ksolves India Limited",
  },
  {
    tickerSymbol: "KTKBANK",
    name: "The Karnataka Bank Limited",
  },
  {
    tickerSymbol: "KUANTUM",
    name: "Kuantum Papers Limited",
  },
  {
    tickerSymbol: "L&TFH",
    name: "L&T Finance Holdings Limited",
  },
  {
    tickerSymbol: "LAGNAM",
    name: "Lagnam Spintex Limited",
  },
  {
    tickerSymbol: "LAKPRE",
    name: "Lakshmi Precision Screws Limited",
  },
  {
    tickerSymbol: "LAL",
    name: "Lorenzini Apparels Limited",
  },
  {
    tickerSymbol: "LALPATHLAB",
    name: "Dr. Lal Path Labs Ltd.",
  },
  {
    tickerSymbol: "LAMBODHARA",
    name: "Lambodhara Textiles Limited",
  },
  {
    tickerSymbol: "LANDMARK",
    name: "Landmark Cars Limited",
  },
  {
    tickerSymbol: "LAOPALA",
    name: "La Opala RG Limited",
  },
  {
    tickerSymbol: "LASA",
    name: "Lasa Supergenerics Limited",
  },
  {
    tickerSymbol: "LATENTVIEW",
    name: "Latent View Analytics Limited",
  },
  {
    tickerSymbol: "LAURUSLABS",
    name: "Laurus Labs Limited",
  },
  {
    tickerSymbol: "LAXMICOT",
    name: "Laxmi Cotspin Limited",
  },
  {
    tickerSymbol: "LAXMIMACH",
    name: "Lakshmi Machine Works Limited",
  },
  {
    tickerSymbol: "LCCINFOTEC",
    name: "LCC Infotech Limited",
  },
  {
    tickerSymbol: "LEMONTREE",
    name: "Lemon Tree Hotels Limited",
  },
  {
    tickerSymbol: "LEXUS",
    name: "Lexus Granito (India) Limited",
  },
  {
    tickerSymbol: "LFIC",
    name: "Lakshmi Finance & Industrial Corporation Limited",
  },
  {
    tickerSymbol: "LGBBROSLTD",
    name: "LG Balakrishnan & Bros Limited",
  },
  {
    tickerSymbol: "LGBFORGE",
    name: "LGB Forge Limited",
  },
  {
    tickerSymbol: "LIBAS",
    name: "Libas Consumer Products Limited",
  },
  {
    tickerSymbol: "LIBERTSHOE",
    name: "Liberty Shoes Limited",
  },
  {
    tickerSymbol: "LICHSGFIN",
    name: "LIC Housing Finance Limited",
  },
  {
    tickerSymbol: "LICI",
    name: "Life Insurance Corporation Of India",
  },
  {
    tickerSymbol: "LIKHITHA",
    name: "Likhitha Infrastructure Limited",
  },
  {
    tickerSymbol: "LINC",
    name: "Linc Limited",
  },
  {
    tickerSymbol: "LINCOLN",
    name: "Lincoln Pharmaceuticals Limited",
  },
  {
    tickerSymbol: "LINDEINDIA",
    name: "Linde India Limited",
  },
  {
    tickerSymbol: "LODHA",
    name: "Macrotech Developers Limited",
  },
  {
    tickerSymbol: "LOKESHMACH",
    name: "Lokesh Machines Limited",
  },
  {
    tickerSymbol: "LOTUSEYE",
    name: "Lotus Eye Hospital and Institute Limited",
  },
  {
    tickerSymbol: "LOVABLE",
    name: "Lovable Lingerie Limited",
  },
  {
    tickerSymbol: "LOYALTEX",
    name: "Loyal Textile Mills Limited",
  },
  {
    tickerSymbol: "LPDC",
    name: "Landmark Property Development Company Limited",
  },
  {
    tickerSymbol: "LSIL",
    name: "Lloyds Steels Industries Limited",
  },
  {
    tickerSymbol: "LT",
    name: "Larsen & Toubro Limited",
  },
  {
    tickerSymbol: "LTIM",
    name: "LTIMindtree Limited",
  },
  {
    tickerSymbol: "LTTS",
    name: "L&T Technology Services Limited",
  },
  {
    tickerSymbol: "LUMAXIND",
    name: "Lumax Industries Limited",
  },
  {
    tickerSymbol: "LUMAXTECH",
    name: "Lumax Auto Technologies Limited",
  },
  {
    tickerSymbol: "LUPIN",
    name: "Lupin Limited",
  },
  {
    tickerSymbol: "LUXIND",
    name: "Lux Industries Limited",
  },
  {
    tickerSymbol: "LXCHEM",
    name: "Laxmi Organic Industries Limited",
  },
  {
    tickerSymbol: "LYKALABS",
    name: "Lyka Labs Limited",
  },
  {
    tickerSymbol: "LYPSAGEMS",
    name: "Lypsa Gems & Jewellery Limited",
  },
  {
    tickerSymbol: "M&M",
    name: "Mahindra & Mahindra Limited",
  },
  {
    tickerSymbol: "M&MFIN",
    name: "Mahindra & Mahindra Financial Services Limited",
  },
  {
    tickerSymbol: "MAANALU",
    name: "Maan Aluminium Limited",
  },
  {
    tickerSymbol: "MACPOWER",
    name: "Macpower CNC Machines Limited",
  },
  {
    tickerSymbol: "MADHAV",
    name: "Madhav Marbles and Granites Limited",
  },
  {
    tickerSymbol: "MADHUCON",
    name: "Madhucon Projects Limited",
  },
  {
    tickerSymbol: "MADRASFERT",
    name: "Madras Fertilizers Limited",
  },
  {
    tickerSymbol: "MAGADSUGAR",
    name: "Magadh Sugar & Energy Limited",
  },
  {
    tickerSymbol: "MAGNUM",
    name: "Magnum Ventures Limited",
  },
  {
    tickerSymbol: "MAHABANK",
    name: "Bank of Maharashtra",
  },
  {
    tickerSymbol: "MAHAPEXLTD",
    name: "Maha Rashtra Apex Corporation Limited",
  },
  {
    tickerSymbol: "MAHASTEEL",
    name: "Mahamaya Steel Industries Limited",
  },
  {
    tickerSymbol: "MAHEPC",
    name: "Mahindra EPC Irrigation Limited",
  },
  {
    tickerSymbol: "MAHESHWARI",
    name: "Maheshwari Logistics Limited",
  },
  {
    tickerSymbol: "MAHINDCIE",
    name: "Mahindra CIE Automotive Limited",
  },
  {
    tickerSymbol: "MAHLIFE",
    name: "Mahindra Lifespace Developers Limited",
  },
  {
    tickerSymbol: "MAHLOG",
    name: "Mahindra Logistics Limited",
  },
  {
    tickerSymbol: "MAHSCOOTER",
    name: "Maharashtra Scooters Limited",
  },
  {
    tickerSymbol: "MAHSEAMLES",
    name: "Maharashtra Seamless Limited",
  },
  {
    tickerSymbol: "MAITHANALL",
    name: "Maithan Alloys Limited",
  },
  {
    tickerSymbol: "MALLCOM",
    name: "Mallcom (India) Limited",
  },
  {
    tickerSymbol: "MALUPAPER",
    name: "Malu Paper Mills Limited",
  },
  {
    tickerSymbol: "MANAKALUCO",
    name: "Manaksia Aluminium Company Limited",
  },
  {
    tickerSymbol: "MANAKCOAT",
    name: "Manaksia Coated Metals & Industries Limited",
  },
  {
    tickerSymbol: "MANAKSIA",
    name: "Manaksia Limited",
  },
  {
    tickerSymbol: "MANAKSTEEL",
    name: "Manaksia Steels Limited",
  },
  {
    tickerSymbol: "MANALIPETC",
    name: "Manali Petrochemicals Limited",
  },
  {
    tickerSymbol: "MANAPPURAM",
    name: "Manappuram Finance Limited",
  },
  {
    tickerSymbol: "MANGALAM",
    name: "Mangalam Drugs And Organics Limited",
  },
  {
    tickerSymbol: "MANGCHEFER",
    name: "Mangalore Chemicals & Fertilizers Limited",
  },
  {
    tickerSymbol: "MANGLMCEM",
    name: "Mangalam Cement Limited",
  },
  {
    tickerSymbol: "MANINDS",
    name: "Man Industries (India) Limited",
  },
  {
    tickerSymbol: "MANINFRA",
    name: "Man Infraconstruction Limited",
  },
  {
    tickerSymbol: "MANKIND",
    name: "Mankind Pharma Limited",
  },
  {
    tickerSymbol: "MANOMAY",
    name: "Manomay Tex India Limited",
  },
  {
    tickerSymbol: "MANORAMA",
    name: "Manorama Industries Limited",
  },
  {
    tickerSymbol: "MANORG",
    name: "Mangalam Organics Limited",
  },
  {
    tickerSymbol: "MANUGRAPH",
    name: "Manugraph India Limited",
  },
  {
    tickerSymbol: "MANYAVAR",
    name: "Vedant Fashions Limited",
  },
  {
    tickerSymbol: "MAPMYINDIA",
    name: "C.E. Info Systems Limited",
  },
  {
    tickerSymbol: "MARALOVER",
    name: "Maral Overseas Limited",
  },
  {
    tickerSymbol: "MARATHON",
    name: "Marathon Nextgen Realty Limited",
  },
  {
    tickerSymbol: "MARICO",
    name: "Marico Limited",
  },
  {
    tickerSymbol: "MARINE",
    name: "Marine Electricals (India) Limited",
  },
  {
    tickerSymbol: "MARKSANS",
    name: "Marksans Pharma Limited",
  },
  {
    tickerSymbol: "MARSHALL",
    name: "Marshall Machines Limited",
  },
  {
    tickerSymbol: "MARUTI",
    name: "Maruti Suzuki India Limited",
  },
  {
    tickerSymbol: "MASFIN",
    name: "MAS Financial Services Limited",
  },
  {
    tickerSymbol: "MASKINVEST",
    name: "Mask Investments Limited",
  },
  {
    tickerSymbol: "MASTEK",
    name: "Mastek Limited",
  },
  {
    tickerSymbol: "MATRIMONY",
    name: "Matrimony.Com Limited",
  },
  {
    tickerSymbol: "MAWANASUG",
    name: "Mawana Sugars Limited",
  },
  {
    tickerSymbol: "MAXHEALTH",
    name: "Max Healthcare Institute Limited",
  },
  {
    tickerSymbol: "MAXIND",
    name: "Max India Limited",
  },
  {
    tickerSymbol: "MAXVIL",
    name: "Max Ventures and Industries Limited",
  },
  {
    tickerSymbol: "MAYURUNIQ",
    name: "Mayur Uniquoters Ltd",
  },
  {
    tickerSymbol: "MAZDA",
    name: "Mazda Limited",
  },
  {
    tickerSymbol: "MAZDOCK",
    name: "Mazagon Dock Shipbuilders Limited",
  },
  {
    tickerSymbol: "MBAPL",
    name: "Madhya Bharat Agro Products Limited",
  },
  {
    tickerSymbol: "MBLINFRA",
    name: "MBL Infrastructure Limited",
  },
  {
    tickerSymbol: "MCDOWELL-N",
    name: "United Spirits Limited",
  },
  {
    tickerSymbol: "MCL",
    name: "Madhav Copper Limited",
  },
  {
    tickerSymbol: "MCLEODRUSS",
    name: "Mcleod Russel India Limited",
  },
  {
    tickerSymbol: "MCX",
    name: "Multi Commodity Exchange of India Limited",
  },
  {
    tickerSymbol: "MEDANTA",
    name: "Global Health Limited",
  },
  {
    tickerSymbol: "MEDICAMEQ",
    name: "Medicamen Biotech Limited",
  },
  {
    tickerSymbol: "MEDICO",
    name: "Medico Remedies Limited",
  },
  {
    tickerSymbol: "MEDPLUS",
    name: "Medplus Health Services Limited",
  },
  {
    tickerSymbol: "MEGASOFT",
    name: "Megasoft Limited",
  },
  {
    tickerSymbol: "MEGASTAR",
    name: "Megastar Foods Limited",
  },
  {
    tickerSymbol: "MELSTAR",
    name: "Melstar Information Technologies Limited",
  },
  {
    tickerSymbol: "MENONBE",
    name: "Menon Bearings Limited",
  },
  {
    tickerSymbol: "MEP",
    name: "MEP Infrastructure Developers Limited",
  },
  {
    tickerSymbol: "METROBRAND",
    name: "Metro Brands Limited",
  },
  {
    tickerSymbol: "METROPOLIS",
    name: "Metropolis Healthcare Limited",
  },
  {
    tickerSymbol: "MFL",
    name: "Meghmani Finechem Limited",
  },
  {
    tickerSymbol: "MFSL",
    name: "Max Financial Services Limited",
  },
  {
    tickerSymbol: "MGEL",
    name: "Mangalam Global Enterprise Limited",
  },
  {
    tickerSymbol: "MGL",
    name: "Mahanagar Gas Limited",
  },
  {
    tickerSymbol: "MHLXMIRU",
    name: "Mahalaxmi Rubtech Limited",
  },
  {
    tickerSymbol: "MHRIL",
    name: "Mahindra Holidays & Resorts India Limited",
  },
  {
    tickerSymbol: "MICEL",
    name: "MIC Electronics Limited",
  },
  {
    tickerSymbol: "MIDHANI",
    name: "Mishra Dhatu Nigam Limited",
  },
  {
    tickerSymbol: "MINDACORP",
    name: "Minda Corporation Limited",
  },
  {
    tickerSymbol: "MINDTECK",
    name: "Mindteck (India) Limited",
  },
  {
    tickerSymbol: "MIRCELECTR",
    name: "MIRC Electronics Limited",
  },
  {
    tickerSymbol: "MIRZAINT",
    name: "Mirza International Limited",
  },
  {
    tickerSymbol: "MITCON",
    name: "MITCON Consultancy & Engineering Services Limited",
  },
  {
    tickerSymbol: "MITTAL",
    name: "Mittal Life Style Limited",
  },
  {
    tickerSymbol: "MMFL",
    name: "MM Forgings Limited",
  },
  {
    tickerSymbol: "MMP",
    name: "MMP Industries Limited",
  },
  {
    tickerSymbol: "MMTC",
    name: "MMTC Limited",
  },
  {
    tickerSymbol: "MODIRUBBER",
    name: "Modi Rubber Limited",
  },
  {
    tickerSymbol: "MODISONLTD",
    name: "MODISON LIMITED",
  },
  {
    tickerSymbol: "MOHITIND",
    name: "Mohit Industries Limited",
  },
  {
    tickerSymbol: "MOIL",
    name: "MOIL Limited",
  },
  {
    tickerSymbol: "MOKSH",
    name: "Moksh Ornaments Limited",
  },
  {
    tickerSymbol: "MOL",
    name: "Meghmani Organics Limited",
  },
  {
    tickerSymbol: "MOLDTECH",
    name: "Mold-Tek Technologies Limited",
  },
  {
    tickerSymbol: "MOLDTKPAC",
    name: "Mold-Tek Packaging Limited",
  },
  {
    tickerSymbol: "MONARCH",
    name: "Monarch Networth Capital Limited",
  },
  {
    tickerSymbol: "MONTECARLO",
    name: "Monte Carlo Fashions Limited",
  },
  {
    tickerSymbol: "MORARJEE",
    name: "Morarjee Textiles Limited",
  },
  {
    tickerSymbol: "MOREPENLAB",
    name: "Morepen Laboratories Limited",
  },
  {
    tickerSymbol: "MOTHERSON",
    name: "Samvardhana Motherson International Limited",
  },
  {
    tickerSymbol: "MOTILALOFS",
    name: "Motilal Oswal Financial Services Limited",
  },
  {
    tickerSymbol: "MOTOGENFIN",
    name: "The Motor & General Finance Limited",
  },
  {
    tickerSymbol: "MPHASIS",
    name: "MphasiS Limited",
  },
  {
    tickerSymbol: "MPSLTD",
    name: "MPS Limited",
  },
  {
    tickerSymbol: "MRF",
    name: "MRF Limited",
  },
  {
    tickerSymbol: "MRO-TEK",
    name: "MRO-TEK Realty Limited",
  },
  {
    tickerSymbol: "MRPL",
    name: "Mangalore Refinery and Petrochemicals Limited",
  },
  {
    tickerSymbol: "MSPL",
    name: "MSP Steel & Power Limited",
  },
  {
    tickerSymbol: "MSTCLTD",
    name: "Mstc Limited",
  },
  {
    tickerSymbol: "MSUMI",
    name: "Motherson Sumi Wiring India Limited",
  },
  {
    tickerSymbol: "MTARTECH",
    name: "Mtar Technologies Limited",
  },
  {
    tickerSymbol: "MTEDUCARE",
    name: "MT Educare Limited",
  },
  {
    tickerSymbol: "MTNL",
    name: "Mahanagar Telephone Nigam Limited",
  },
  {
    tickerSymbol: "MUKANDLTD",
    name: "Mukand Limited",
  },
  {
    tickerSymbol: "MUKTAARTS",
    name: "Mukta Arts Limited",
  },
  {
    tickerSymbol: "MUNJALAU",
    name: "Munjal Auto Industries Limited",
  },
  {
    tickerSymbol: "MUNJALSHOW",
    name: "Munjal Showa Limited",
  },
  {
    tickerSymbol: "MURUDCERA",
    name: "Murudeshwar Ceramics Limited",
  },
  {
    tickerSymbol: "MUTHOOTCAP",
    name: "Muthoot Capital Services Limited",
  },
  {
    tickerSymbol: "MUTHOOTFIN",
    name: "Muthoot Finance Limited",
  },
  {
    tickerSymbol: "NACLIND",
    name: "NACL Industries Limited",
  },
  {
    tickerSymbol: "NAGAFERT",
    name: "Nagarjuna Fertilizers and Chemicals Limited",
  },
  {
    tickerSymbol: "NAGREEKCAP",
    name: "Nagreeka Capital & Infrastructure Limited",
  },
  {
    tickerSymbol: "NAGREEKEXP",
    name: "Nagreeka Exports Limited",
  },
  {
    tickerSymbol: "NAHARCAP",
    name: "Nahar Capital and Financial Services Limited",
  },
  {
    tickerSymbol: "NAHARINDUS",
    name: "Nahar Industrial Enterprises Limited",
  },
  {
    tickerSymbol: "NAHARPOLY",
    name: "Nahar Poly Films Limited",
  },
  {
    tickerSymbol: "NAHARSPING",
    name: "Nahar Spinning Mills Limited",
  },
  {
    tickerSymbol: "NAM-INDIA",
    name: "Nippon Life India Asset Management Limited",
  },
  {
    tickerSymbol: "NARMADA",
    name: "Narmada Agrobase Limited",
  },
  {
    tickerSymbol: "NATCOPHARM",
    name: "Natco Pharma Limited",
  },
  {
    tickerSymbol: "NATHBIOGEN",
    name: "Nath Bio-Genes (India) Limited",
  },
  {
    tickerSymbol: "NATIONALUM",
    name: "National Aluminium Company Limited",
  },
  {
    tickerSymbol: "NATNLSTEEL",
    name: "National Steel And Agro Industries Limited",
  },
  {
    tickerSymbol: "NAUKRI",
    name: "Info Edge (India) Limited",
  },
  {
    tickerSymbol: "NAVA",
    name: "NAVA LIMITED",
  },
  {
    tickerSymbol: "NAVINFLUOR",
    name: "Navin Fluorine International Limited",
  },
  {
    tickerSymbol: "NAVKARCORP",
    name: "Navkar Corporation Limited",
  },
  {
    tickerSymbol: "NAVNETEDUL",
    name: "Navneet Education Limited",
  },
  {
    tickerSymbol: "NAZARA",
    name: "Nazara Technologies Limited",
  },
  {
    tickerSymbol: "NBCC",
    name: "NBCC (India) Limited",
  },
  {
    tickerSymbol: "NBIFIN",
    name: "N. B. I. Industrial Finance Company Limited",
  },
  {
    tickerSymbol: "NCC",
    name: "NCC Limited",
  },
  {
    tickerSymbol: "NCLIND",
    name: "NCL Industries Limited",
  },
  {
    tickerSymbol: "NDGL",
    name: "Naga Dhunseri Group Limited",
  },
  {
    tickerSymbol: "NDL",
    name: "Nandan Denim Limited",
  },
  {
    tickerSymbol: "NDLVENTURE",
    name: "NDL Ventures Limited",
  },
  {
    tickerSymbol: "NDRAUTO",
    name: "Ndr Auto Components Limited",
  },
  {
    tickerSymbol: "NDTV",
    name: "New Delhi Television Limited",
  },
  {
    tickerSymbol: "NECCLTD",
    name: "North Eastern Carrying Corporation Limited",
  },
  {
    tickerSymbol: "NECLIFE",
    name: "Nectar Lifesciences Limited",
  },
  {
    tickerSymbol: "NELCAST",
    name: "Nelcast Limited",
  },
  {
    tickerSymbol: "NELCO",
    name: "NELCO Limited",
  },
  {
    tickerSymbol: "NEOGEN",
    name: "Neogen Chemicals Limited",
  },
  {
    tickerSymbol: "NESCO",
    name: "Nesco Limited",
  },
  {
    tickerSymbol: "NESTLEIND",
    name: "Nestle India Limited",
  },
  {
    tickerSymbol: "NETWORK18",
    name: "Network18 Media & Investments Limited",
  },
  {
    tickerSymbol: "NEULANDLAB",
    name: "Neuland Laboratories Limited",
  },
  {
    tickerSymbol: "NEWGEN",
    name: "Newgen Software Technologies Limited",
  },
  {
    tickerSymbol: "NEXTMEDIA",
    name: "Next Mediaworks Limited",
  },
  {
    tickerSymbol: "NFL",
    name: "National Fertilizers Limited",
  },
  {
    tickerSymbol: "NGIL",
    name: "Nakoda Group of Industries Limited",
  },
  {
    tickerSymbol: "NGLFINE",
    name: "NGL Fine-Chem Limited",
  },
  {
    tickerSymbol: "NH",
    name: "Narayana Hrudayalaya Ltd.",
  },
  {
    tickerSymbol: "NHPC",
    name: "NHPC Limited",
  },
  {
    tickerSymbol: "NIACL",
    name: "The New India Assurance Company Limited",
  },
  {
    tickerSymbol: "NIBL",
    name: "NRB Industrial Bearings Limited",
  },
  {
    tickerSymbol: "NIITLTD",
    name: "NIIT Limited",
  },
  {
    tickerSymbol: "NILAINFRA",
    name: "Nila Infrastructures Limited",
  },
  {
    tickerSymbol: "NILASPACES",
    name: "Nila Spaces Limited",
  },
  {
    tickerSymbol: "NILKAMAL",
    name: "Nilkamal Limited",
  },
  {
    tickerSymbol: "NINSYS",
    name: "NINtec Systems Limited",
  },
  {
    tickerSymbol: "NIPPOBATRY",
    name: "Indo-National Limited",
  },
  {
    tickerSymbol: "NIRAJ",
    name: "Niraj Cement Structurals Limited",
  },
  {
    tickerSymbol: "NIRAJISPAT",
    name: "Niraj Ispat Industries Limited",
  },
  {
    tickerSymbol: "NITCO",
    name: "Nitco Limited",
  },
  {
    tickerSymbol: "NITINSPIN",
    name: "Nitin Spinners Limited",
  },
  {
    tickerSymbol: "NITIRAJ",
    name: "Nitiraj Engineers Limited",
  },
  {
    tickerSymbol: "NKIND",
    name: "NK Industries Limited",
  },
  {
    tickerSymbol: "NLCINDIA",
    name: "NLC India Limited",
  },
  {
    tickerSymbol: "NMDC",
    name: "NMDC Limited",
  },
  {
    tickerSymbol: "NOCIL",
    name: "NOCIL Limited",
  },
  {
    tickerSymbol: "NOIDATOLL",
    name: "Noida Toll Bridge Company Limited",
  },
  {
    tickerSymbol: "NORBTEAEXP",
    name: "Norben Tea & Exports Limited",
  },
  {
    tickerSymbol: "NOVARTIND",
    name: "Novartis India Limited",
  },
  {
    tickerSymbol: "NRAIL",
    name: "N R Agarwal Industries Limited",
  },
  {
    tickerSymbol: "NRBBEARING",
    name: "NRB Bearing Limited",
  },
  {
    tickerSymbol: "NRL",
    name: "Nupur Recyclers Limited",
  },
  {
    tickerSymbol: "NSIL",
    name: "Nalwa Sons Investments Limited",
  },
  {
    tickerSymbol: "NSLNISP",
    name: "NMDC Steel Limited",
  },
  {
    tickerSymbol: "NTPC",
    name: "NTPC Limited",
  },
  {
    tickerSymbol: "NUCLEUS",
    name: "Nucleus Software Exports Limited",
  },
  {
    tickerSymbol: "NURECA",
    name: "Nureca Limited",
  },
  {
    tickerSymbol: "NUVOCO",
    name: "Nuvoco Vistas Corporation Limited",
  },
  {
    tickerSymbol: "NYKAA",
    name: "FSN E-Commerce Ventures Limited",
  },
  {
    tickerSymbol: "OAL",
    name: "Oriental Aromatics Limited",
  },
  {
    tickerSymbol: "OBCL",
    name: "Orissa Bengal Carrier Limited",
  },
  {
    tickerSymbol: "OBEROIRLTY",
    name: "Oberoi Realty Limited",
  },
  {
    tickerSymbol: "OCCL",
    name: "Oriental Carbon & Chemicals Limited",
  },
  {
    tickerSymbol: "OFSS",
    name: "Oracle Financial Services Software Limited",
  },
  {
    tickerSymbol: "OIL",
    name: "Oil India Limited",
  },
  {
    tickerSymbol: "OILCOUNTUB",
    name: "Oil Country Tubular Limited",
  },
  {
    tickerSymbol: "OLECTRA",
    name: "Olectra Greentech Limited",
  },
  {
    tickerSymbol: "OMAXAUTO",
    name: "Omax Autos Limited",
  },
  {
    tickerSymbol: "OMAXE",
    name: "Omaxe Limited",
  },
  {
    tickerSymbol: "OMINFRAL",
    name: "OM INFRA LIMITED",
  },
  {
    tickerSymbol: "OMKARCHEM",
    name: "Omkar Speciality Chemicals Limited",
  },
  {
    tickerSymbol: "ONELIFECAP",
    name: "Onelife Capital Advisors Limited",
  },
  {
    tickerSymbol: "ONEPOINT",
    name: "One Point One Solutions Limited",
  },
  {
    tickerSymbol: "ONGC",
    name: "Oil & Natural Gas Corporation Limited",
  },
  {
    tickerSymbol: "ONMOBILE",
    name: "OnMobile Global Limited",
  },
  {
    tickerSymbol: "ONWARDTEC",
    name: "Onward Technologies Limited",
  },
  {
    tickerSymbol: "OPTIEMUS",
    name: "Optiemus Infracom Limited",
  },
  {
    tickerSymbol: "ORBTEXP",
    name: "Orbit Exports Limited",
  },
  {
    tickerSymbol: "ORCHPHARMA",
    name: "Orchid Pharma Limited",
  },
  {
    tickerSymbol: "ORICONENT",
    name: "Oricon Enterprises Limited",
  },
  {
    tickerSymbol: "ORIENTABRA",
    name: "Orient Abrasives Limited",
  },
  {
    tickerSymbol: "ORIENTALTL",
    name: "Oriental Trimex Limited",
  },
  {
    tickerSymbol: "ORIENTBELL",
    name: "Orient Bell Limited",
  },
  {
    tickerSymbol: "ORIENTCEM",
    name: "Orient Cement Limited",
  },
  {
    tickerSymbol: "ORIENTELEC",
    name: "Orient Electric Limited",
  },
  {
    tickerSymbol: "ORIENTHOT",
    name: "Oriental Hotels Limited",
  },
  {
    tickerSymbol: "ORIENTLTD",
    name: "Orient Press Limited",
  },
  {
    tickerSymbol: "ORIENTPPR",
    name: "Orient Paper & Industries Limited",
  },
  {
    tickerSymbol: "ORISSAMINE",
    name: "The Orissa Minerals Development Company Limited",
  },
  {
    tickerSymbol: "ORTEL",
    name: "Ortel Communications Limited",
  },
  {
    tickerSymbol: "ORTINLAB",
    name: "Ortin Laboratories Limited",
  },
  {
    tickerSymbol: "OSIAHYPER",
    name: "Osia Hyper Retail Limited",
  },
  {
    tickerSymbol: "OSWALAGRO",
    name: "Oswal Agro Mills Limited",
  },
  {
    tickerSymbol: "OSWALSEEDS",
    name: "ShreeOswal Seeds And Chemicals Limited",
  },
  {
    tickerSymbol: "PAGEIND",
    name: "Page Industries Limited",
  },
  {
    tickerSymbol: "PAISALO",
    name: "Paisalo Digital Limited",
  },
  {
    tickerSymbol: "PALASHSECU",
    name: "Palash Securities Limited",
  },
  {
    tickerSymbol: "PALREDTEC",
    name: "Palred Technologies Limited",
  },
  {
    tickerSymbol: "PANACEABIO",
    name: "Panacea Biotec Limited",
  },
  {
    tickerSymbol: "PANACHE",
    name: "Panache Digilife Limited",
  },
  {
    tickerSymbol: "PANAMAPET",
    name: "Panama Petrochem Limited",
  },
  {
    tickerSymbol: "PANSARI",
    name: "Pansari Developers Limited",
  },
  {
    tickerSymbol: "PAR",
    name: "Par Drugs And Chemicals Limited",
  },
  {
    tickerSymbol: "PARACABLES",
    name: "Paramount Communications Limited",
  },
  {
    tickerSymbol: "PARADEEP",
    name: "Paradeep Phosphates Limited",
  },
  {
    tickerSymbol: "PARAGMILK",
    name: "Parag Milk Foods Limited",
  },
  {
    tickerSymbol: "PARAS",
    name: "Paras Defence and Space Technologies Limited",
  },
  {
    tickerSymbol: "PARASPETRO",
    name: "Paras Petrofils Limited",
  },
  {
    tickerSymbol: "PARSVNATH",
    name: "Parsvnath Developers Limited",
  },
  {
    tickerSymbol: "PASUPTAC",
    name: "Pasupati Acrylon Limited",
  },
  {
    tickerSymbol: "PATANJALI",
    name: "Patanjali Foods Limited",
  },
  {
    tickerSymbol: "PATELENG",
    name: "Patel Engineering Limited",
  },
  {
    tickerSymbol: "PATINTLOG",
    name: "Patel Integrated Logistics Limited",
  },
  {
    tickerSymbol: "PAYTM",
    name: "One 97 Communications Limited",
  },
  {
    tickerSymbol: "PCBL",
    name: "PCBL LIMITED",
  },
  {
    tickerSymbol: "PCJEWELLER",
    name: "PC Jeweller Limited",
  },
  {
    tickerSymbol: "PDMJEPAPER",
    name: "Pudumjee Paper Products Limited",
  },
  {
    tickerSymbol: "PDSL",
    name: "PDS Limited",
  },
  {
    tickerSymbol: "PEARLPOLY",
    name: "Pearl Polymers Limited",
  },
  {
    tickerSymbol: "PEL",
    name: "Piramal Enterprises Limited",
  },
  {
    tickerSymbol: "PENIND",
    name: "Pennar Industries Limited",
  },
  {
    tickerSymbol: "PENINLAND",
    name: "Peninsula Land Limited",
  },
  {
    tickerSymbol: "PERSISTENT",
    name: "Persistent Systems Limited",
  },
  {
    tickerSymbol: "PETRONET",
    name: "Petronet LNG Limited",
  },
  {
    tickerSymbol: "PFC",
    name: "Power Finance Corporation Limited",
  },
  {
    tickerSymbol: "PFIZER",
    name: "Pfizer Limited",
  },
  {
    tickerSymbol: "PFOCUS",
    name: "Prime Focus Limited",
  },
  {
    tickerSymbol: "PFS",
    name: "PTC India Financial Services Limited",
  },
  {
    tickerSymbol: "PGEL",
    name: "PG Electroplast Limited",
  },
  {
    tickerSymbol: "PGHH",
    name: "Procter & Gamble Hygiene and Health Care Limited",
  },
  {
    tickerSymbol: "PGHL",
    name: "Procter & Gamble Health Limited",
  },
  {
    tickerSymbol: "PGIL",
    name: "Pearl Global Industries Limited",
  },
  {
    tickerSymbol: "PHOENIXLTD",
    name: "The Phoenix Mills Limited",
  },
  {
    tickerSymbol: "PIDILITIND",
    name: "Pidilite Industries Limited",
  },
  {
    tickerSymbol: "PIIND",
    name: "PI Industries Limited",
  },
  {
    tickerSymbol: "PILANIINVS",
    name: "Pilani Investment and Industries Corporation Limited",
  },
  {
    tickerSymbol: "PILITA",
    name: "PIL ITALICA LIFESTYLE LIMITED",
  },
  {
    tickerSymbol: "PIONEEREMB",
    name: "Pioneer Embroideries Limited",
  },
  {
    tickerSymbol: "PITTIENG",
    name: "Pitti Engineering Limited",
  },
  {
    tickerSymbol: "PIXTRANS",
    name: "Pix Transmissions Limited",
  },
  {
    tickerSymbol: "PKTEA",
    name: "The Peria Karamalai Tea & Produce Company Limited",
  },
  {
    tickerSymbol: "PLASTIBLEN",
    name: "Plastiblends India Limited",
  },
  {
    tickerSymbol: "PNB",
    name: "Punjab National Bank",
  },
  {
    tickerSymbol: "PNBGILTS",
    name: "PNB Gilts Limited",
  },
  {
    tickerSymbol: "PNBHOUSING",
    name: "PNB Housing Finance Limited",
  },
  {
    tickerSymbol: "PNC",
    name: "Pritish Nandy Communications Limited",
  },
  {
    tickerSymbol: "PNCINFRA",
    name: "PNC Infratech Limited",
  },
  {
    tickerSymbol: "POCL",
    name: "Pondy Oxides & Chemicals Limited",
  },
  {
    tickerSymbol: "PODDARHOUS",
    name: "Poddar Housing and Development Limited",
  },
  {
    tickerSymbol: "PODDARMENT",
    name: "Poddar Pigments Limited",
  },
  {
    tickerSymbol: "POKARNA",
    name: "Pokarna Limited",
  },
  {
    tickerSymbol: "POLICYBZR",
    name: "PB Fintech Limited",
  },
  {
    tickerSymbol: "POLYCAB",
    name: "Polycab India Limited",
  },
  {
    tickerSymbol: "POLYMED",
    name: "Poly Medicure Limited",
  },
  {
    tickerSymbol: "POLYPLEX",
    name: "Polyplex Corporation Limited",
  },
  {
    tickerSymbol: "PONNIERODE",
    name: "Ponni Sugars (Erode) Limited",
  },
  {
    tickerSymbol: "POONAWALLA",
    name: "Poonawalla Fincorp Limited",
  },
  {
    tickerSymbol: "POWERGRID",
    name: "Power Grid Corporation of India Limited",
  },
  {
    tickerSymbol: "POWERINDIA",
    name: "Hitachi Energy India Limited",
  },
  {
    tickerSymbol: "POWERMECH",
    name: "Power Mech Projects Limited",
  },
  {
    tickerSymbol: "PPAP",
    name: "PPAP Automotive Limited",
  },
  {
    tickerSymbol: "PPL",
    name: "Prakash Pipes Limited",
  },
  {
    tickerSymbol: "PPLPHARMA",
    name: "Piramal Pharma Limited",
  },
  {
    tickerSymbol: "PRAENG",
    name: "Prajay Engineers Syndicate Limited",
  },
  {
    tickerSymbol: "PRAJIND",
    name: "Praj Industries Limited",
  },
  {
    tickerSymbol: "PRAKASH",
    name: "Prakash Industries Limited",
  },
  {
    tickerSymbol: "PRAKASHSTL",
    name: "Prakash Steelage Limited",
  },
  {
    tickerSymbol: "PRAXIS",
    name: "Praxis Home Retail Limited",
  },
  {
    tickerSymbol: "PRECAM",
    name: "Precision Camshafts Limited",
  },
  {
    tickerSymbol: "PRECOT",
    name: "Precot Limited",
  },
  {
    tickerSymbol: "PRECWIRE",
    name: "Precision Wires India Limited",
  },
  {
    tickerSymbol: "PREMEXPLN",
    name: "Premier Explosives Limited",
  },
  {
    tickerSymbol: "PREMIERPOL",
    name: "Premier Polyfilm Limited",
  },
  {
    tickerSymbol: "PRESSMN",
    name: "Pressman Advertising Limited",
  },
  {
    tickerSymbol: "PRESTIGE",
    name: "Prestige Estates Projects Limited",
  },
  {
    tickerSymbol: "PRICOLLTD",
    name: "Pricol Limited",
  },
  {
    tickerSymbol: "PRIMESECU",
    name: "Prime Securities Limited",
  },
  {
    tickerSymbol: "PRINCEPIPE",
    name: "Prince Pipes And Fittings Limited",
  },
  {
    tickerSymbol: "PRITI",
    name: "Priti International Limited",
  },
  {
    tickerSymbol: "PRITIKAUTO",
    name: "Pritika Auto Industries Limited",
  },
  {
    tickerSymbol: "PRIVISCL",
    name: "Privi Speciality Chemicals Limited",
  },
  {
    tickerSymbol: "PROZONINTU",
    name: "Prozone Intu Properties Limited",
  },
  {
    tickerSymbol: "PRSMJOHNSN",
    name: "Prism Johnson Limited",
  },
  {
    tickerSymbol: "PRUDENT",
    name: "Prudent Corporate Advisory Services Limited",
  },
  {
    tickerSymbol: "PSB",
    name: "Punjab & Sind Bank",
  },
  {
    tickerSymbol: "PSPPROJECT",
    name: "PSP Projects Limited",
  },
  {
    tickerSymbol: "PTC",
    name: "PTC India Limited",
  },
  {
    tickerSymbol: "PTL",
    name: "PTL Enterprises Limited",
  },
  {
    tickerSymbol: "PUNJABCHEM",
    name: "Punjab Chemicals & Crop Protection Limited",
  },
  {
    tickerSymbol: "PURVA",
    name: "Puravankara Limited",
  },
  {
    tickerSymbol: "PVP",
    name: "PVP Ventures Limited",
  },
  {
    tickerSymbol: "PVRINOX",
    name: "PVR INOX Limited",
  },
  {
    tickerSymbol: "QUESS",
    name: "Quess Corp Limited",
  },
  {
    tickerSymbol: "QUICKHEAL",
    name: "Quick Heal Technologies Limited",
  },
  {
    tickerSymbol: "RACE",
    name: "Race Eco Chain Limited",
  },
  {
    tickerSymbol: "RADAAN",
    name: "Radaan Mediaworks India Limited",
  },
  {
    tickerSymbol: "RADHIKAJWE",
    name: "Radhika Jeweltech Limited",
  },
  {
    tickerSymbol: "RADIANTCMS",
    name: "Radiant Cash Management Services Limited",
  },
  {
    tickerSymbol: "RADICO",
    name: "Radico Khaitan Limited",
  },
  {
    tickerSymbol: "RADIOCITY",
    name: "Music Broadcast Limited",
  },
  {
    tickerSymbol: "RAILTEL",
    name: "Railtel Corporation Of India Limited",
  },
  {
    tickerSymbol: "RAIN",
    name: "Rain Industries Limited",
  },
  {
    tickerSymbol: "RAINBOW",
    name: "Rainbow Childrens Medicare Limited",
  },
  {
    tickerSymbol: "RAJESHEXPO",
    name: "Rajesh Exports Limited",
  },
  {
    tickerSymbol: "RAJMET",
    name: "Rajnandini Metal Limited",
  },
  {
    tickerSymbol: "RAJRATAN",
    name: "Rajratan Global Wire Limited",
  },
  {
    tickerSymbol: "RAJRILTD",
    name: "Raj Rayon Industries Limited",
  },
  {
    tickerSymbol: "RAJSREESUG",
    name: "Rajshree Sugars & Chemicals Limited",
  },
  {
    tickerSymbol: "RAJTV",
    name: "Raj Television Network Limited",
  },
  {
    tickerSymbol: "RALLIS",
    name: "Rallis India Limited",
  },
  {
    tickerSymbol: "RAMANEWS",
    name: "Shree Rama Newsprint Limited",
  },
  {
    tickerSymbol: "RAMAPHO",
    name: "Rama Phosphates Limited",
  },
  {
    tickerSymbol: "RAMASTEEL",
    name: "Rama Steel Tubes Limited",
  },
  {
    tickerSymbol: "RAMCOCEM",
    name: "The Ramco Cements Limited",
  },
  {
    tickerSymbol: "RAMCOIND",
    name: "Ramco Industries Limited",
  },
  {
    tickerSymbol: "RAMCOSYS",
    name: "Ramco Systems Limited",
  },
  {
    tickerSymbol: "RAMKY",
    name: "Ramky Infrastructure Limited",
  },
  {
    tickerSymbol: "RAMRAT",
    name: "Ram Ratna Wires Limited",
  },
  {
    tickerSymbol: "RANASUG",
    name: "Rana Sugars Limited",
  },
  {
    tickerSymbol: "RANEENGINE",
    name: "Rane Engine Valve Limited",
  },
  {
    tickerSymbol: "RANEHOLDIN",
    name: "Rane Holdings Limited",
  },
  {
    tickerSymbol: "RATEGAIN",
    name: "Rategain Travel Technologies Limited",
  },
  {
    tickerSymbol: "RATNAMANI",
    name: "Ratnamani Metals & Tubes Limited",
  },
  {
    tickerSymbol: "RAYMOND",
    name: "Raymond Limited",
  },
  {
    tickerSymbol: "RBA",
    name: "Restaurant Brands Asia Limited",
  },
  {
    tickerSymbol: "RBL",
    name: "Rane Brake Lining Limited",
  },
  {
    tickerSymbol: "RBLBANK",
    name: "RBL Bank Limited",
  },
  {
    tickerSymbol: "RCF",
    name: "Rashtriya Chemicals and Fertilizers Limited",
  },
  {
    tickerSymbol: "RECLTD",
    name: "REC Limited",
  },
  {
    tickerSymbol: "REDINGTON",
    name: "Redington Limited",
  },
  {
    tickerSymbol: "REFEX",
    name: "Refex Industries Limited",
  },
  {
    tickerSymbol: "REGENCERAM",
    name: "Regency Ceramics Limited",
  },
  {
    tickerSymbol: "RELAXO",
    name: "Relaxo Footwears Limited",
  },
  {
    tickerSymbol: "RELCAPITAL",
    name: "Reliance Capital Limited",
  },
  {
    tickerSymbol: "RELCHEMQ",
    name: "Reliance Chemotex Industries Limited",
  },
  {
    tickerSymbol: "RELIANCE",
    name: "Reliance Industries Limited",
  },
  {
    tickerSymbol: "RELIGARE",
    name: "Religare Enterprises Limited",
  },
  {
    tickerSymbol: "RELINFRA",
    name: "Reliance Infrastructure Limited",
  },
  {
    tickerSymbol: "REMSONSIND",
    name: "Remsons Industries Limited",
  },
  {
    tickerSymbol: "RENUKA",
    name: "Shree Renuka Sugars Limited",
  },
  {
    tickerSymbol: "REPCOHOME",
    name: "Repco Home Finance Limited",
  },
  {
    tickerSymbol: "REPL",
    name: "Rudrabhishek Enterprises Limited",
  },
  {
    tickerSymbol: "REPRO",
    name: "Repro India Limited",
  },
  {
    tickerSymbol: "RESPONIND",
    name: "Responsive Industries Limited",
  },
  {
    tickerSymbol: "REVATHI",
    name: "Revathi Equipment Limited",
  },
  {
    tickerSymbol: "RGL",
    name: "Renaissance Global Limited",
  },
  {
    tickerSymbol: "RHFL",
    name: "Reliance Home Finance Limited",
  },
  {
    tickerSymbol: "RHIM",
    name: "RHI MAGNESITA INDIA LIMITED",
  },
  {
    tickerSymbol: "RHL",
    name: "Robust Hotels Limited",
  },
  {
    tickerSymbol: "RICOAUTO",
    name: "Rico Auto Industries Limited",
  },
  {
    tickerSymbol: "RIIL",
    name: "Reliance Industrial Infrastructure Limited",
  },
  {
    tickerSymbol: "RITCO",
    name: "Ritco Logistics Limited",
  },
  {
    tickerSymbol: "RITES",
    name: "RITES Limited",
  },
  {
    tickerSymbol: "RKDL",
    name: "Ravi Kumar Distilleries Limited",
  },
  {
    tickerSymbol: "RKEC",
    name: "RKEC Projects Limited",
  },
  {
    tickerSymbol: "RKFORGE",
    name: "Ramkrishna Forgings Limited",
  },
  {
    tickerSymbol: "RMCL",
    name: "Radha Madhav Corporation Limited",
  },
  {
    tickerSymbol: "RML",
    name: "Rane (Madras) Limited",
  },
  {
    tickerSymbol: "RNAVAL",
    name: "Reliance Naval and Engineering Limited",
  },
  {
    tickerSymbol: "ROHLTD",
    name: "Royal Orchid Hotels Limited",
  },
  {
    tickerSymbol: "ROLEXRINGS",
    name: "Rolex Rings Limited",
  },
  {
    tickerSymbol: "ROLLT",
    name: "Rollatainers Limited",
  },
  {
    tickerSymbol: "ROML",
    name: "Raj Oil Mills Limited",
  },
  {
    tickerSymbol: "ROSSARI",
    name: "Rossari Biotech Limited",
  },
  {
    tickerSymbol: "ROSSELLIND",
    name: "Rossell India Limited",
  },
  {
    tickerSymbol: "ROTO",
    name: "Roto Pumps Limited",
  },
  {
    tickerSymbol: "ROUTE",
    name: "ROUTE MOBILE LIMITED",
  },
  {
    tickerSymbol: "RPGLIFE",
    name: "RPG Life Sciences Limited",
  },
  {
    tickerSymbol: "RPOWER",
    name: "Reliance Power Limited",
  },
  {
    tickerSymbol: "RPPINFRA",
    name: "R.P.P. Infra Projects Limited",
  },
  {
    tickerSymbol: "RPPL",
    name: "Rajshree Polypack Limited",
  },
  {
    tickerSymbol: "RPSGVENT",
    name: "RPSG VENTURES LIMITED",
  },
  {
    tickerSymbol: "RSSOFTWARE",
    name: "R. S. Software (India) Limited",
  },
  {
    tickerSymbol: "RSWM",
    name: "RSWM Limited",
  },
  {
    tickerSymbol: "RSYSTEMS",
    name: "R Systems International Limited",
  },
  {
    tickerSymbol: "RTNINDIA",
    name: "RattanIndia Enterprises Limited",
  },
  {
    tickerSymbol: "RTNPOWER",
    name: "RattanIndia Power Limited",
  },
  {
    tickerSymbol: "RUBYMILLS",
    name: "The Ruby Mills Limited",
  },
  {
    tickerSymbol: "RUCHINFRA",
    name: "Ruchi Infrastructure Limited",
  },
  {
    tickerSymbol: "RUCHIRA",
    name: "Ruchira Papers Limited",
  },
  {
    tickerSymbol: "RUPA",
    name: "Rupa & Company Limited",
  },
  {
    tickerSymbol: "RUSHIL",
    name: "Rushil Decor Limited",
  },
  {
    tickerSymbol: "RUSTOMJEE",
    name: "Keystone Realtors Limited",
  },
  {
    tickerSymbol: "RVHL",
    name: "Ravinder Heights Limited",
  },
  {
    tickerSymbol: "RVNL",
    name: "Rail Vikas Nigam Limited",
  },
  {
    tickerSymbol: "S&SPOWER",
    name: "S&S Power Switchgears Limited",
  },
  {
    tickerSymbol: "SABEVENTS",
    name: "Sab Events & Governance Now Media Limited",
  },
  {
    tickerSymbol: "SABTN",
    name: "Sri Adhikari Brothers Television Network Limited",
  },
  {
    tickerSymbol: "SADBHAV",
    name: "Sadbhav Engineering Limited",
  },
  {
    tickerSymbol: "SADBHIN",
    name: "Sadbhav Infrastructure Project Limited",
  },
  {
    tickerSymbol: "SADHNANIQ",
    name: "Sadhana Nitrochem Limited",
  },
  {
    tickerSymbol: "SAFARI",
    name: "Safari Industries (India) Limited",
  },
  {
    tickerSymbol: "SAGARDEEP",
    name: "Sagardeep Alloys Limited",
  },
  {
    tickerSymbol: "SAGCEM",
    name: "Sagar Cements Limited",
  },
  {
    tickerSymbol: "SAH",
    name: "Sah Polymers Limited",
  },
  {
    tickerSymbol: "SAHYADRI",
    name: "Sahyadri Industries Limited",
  },
  {
    tickerSymbol: "SAIL",
    name: "Steel Authority of India Limited",
  },
  {
    tickerSymbol: "SAKAR",
    name: "Sakar Healthcare Limited",
  },
  {
    tickerSymbol: "SAKHTISUG",
    name: "Sakthi Sugars Limited",
  },
  {
    tickerSymbol: "SAKSOFT",
    name: "Saksoft Limited",
  },
  {
    tickerSymbol: "SAKUMA",
    name: "Sakuma Exports Limited",
  },
  {
    tickerSymbol: "SALASAR",
    name: "Salasar Techno Engineering Limited",
  },
  {
    tickerSymbol: "SALONA",
    name: "Salona Cotspin Limited",
  },
  {
    tickerSymbol: "SALSTEEL",
    name: "S.A.L. Steel Limited",
  },
  {
    tickerSymbol: "SALZERELEC",
    name: "Salzer Electronics Limited",
  },
  {
    tickerSymbol: "SAMBHAAV",
    name: "Sambhaav Media Limited",
  },
  {
    tickerSymbol: "SANCO",
    name: "Sanco Industries Limited",
  },
  {
    tickerSymbol: "SANDESH",
    name: "The Sandesh Limited",
  },
  {
    tickerSymbol: "SANDHAR",
    name: "Sandhar Technologies Limited",
  },
  {
    tickerSymbol: "SANGAMIND",
    name: "Sangam (India) Limited",
  },
  {
    tickerSymbol: "SANGHIIND",
    name: "Sanghi Industries Limited",
  },
  {
    tickerSymbol: "SANGHVIMOV",
    name: "Sanghvi Movers Limited",
  },
  {
    tickerSymbol: "SANGINITA",
    name: "Sanginita Chemicals Limited",
  },
  {
    tickerSymbol: "SANOFI",
    name: "Sanofi India Limited",
  },
  {
    tickerSymbol: "SANSERA",
    name: "Sansera Engineering Limited",
  },
  {
    tickerSymbol: "SAPPHIRE",
    name: "Sapphire Foods India Limited",
  },
  {
    tickerSymbol: "SARDAEN",
    name: "Sarda Energy & Minerals Limited",
  },
  {
    tickerSymbol: "SAREGAMA",
    name: "Saregama India Limited",
  },
  {
    tickerSymbol: "SARLAPOLY",
    name: "Sarla Performance Fibers Limited",
  },
  {
    tickerSymbol: "SARVESHWAR",
    name: "Sarveshwar Foods Limited",
  },
  {
    tickerSymbol: "SASKEN",
    name: "Sasken Technologies Limited",
  },
  {
    tickerSymbol: "SASTASUNDR",
    name: "Sastasundar Ventures Limited",
  },
  {
    tickerSymbol: "SATIA",
    name: "Satia Industries Limited",
  },
  {
    tickerSymbol: "SATIN",
    name: "Satin Creditcare Network Limited",
  },
  {
    tickerSymbol: "SATINDLTD",
    name: "Sat Industries Limited",
  },
  {
    tickerSymbol: "SBC",
    name: "SBC Exports Limited",
  },
  {
    tickerSymbol: "SBCL",
    name: "Shivalik Bimetal Controls Limited",
  },
  {
    tickerSymbol: "SBGLP",
    name: "Suratwwala Business Group Limited",
  },
  {
    tickerSymbol: "SBICARD",
    name: "SBI Cards and Payment Services Limited",
  },
  {
    tickerSymbol: "SBILIFE",
    name: "SBI Life Insurance Company Limited",
  },
  {
    tickerSymbol: "SBIN",
    name: "State Bank of India",
  },
  {
    tickerSymbol: "SCAPDVR",
    name: "Stampede Capital Limited",
  },
  {
    tickerSymbol: "SCHAEFFLER",
    name: "Schaeffler India Limited",
  },
  {
    tickerSymbol: "SCHAND",
    name: "S Chand And Company Limited",
  },
  {
    tickerSymbol: "SCHNEIDER",
    name: "Schneider Electric Infrastructure Limited",
  },
  {
    tickerSymbol: "SCI",
    name: "Shipping Corporation Of India Limited",
  },
  {
    tickerSymbol: "SCPL",
    name: "Sheetal Cool Products Limited",
  },
  {
    tickerSymbol: "SDBL",
    name: "Som Distilleries & Breweries Limited",
  },
  {
    tickerSymbol: "SEAMECLTD",
    name: "Seamec Limited",
  },
  {
    tickerSymbol: "SECURCRED",
    name: "SecUR Credentials Limited",
  },
  {
    tickerSymbol: "SECURKLOUD",
    name: "SECUREKLOUD TECHNOLOGIES LIMITED",
  },
  {
    tickerSymbol: "SEJALLTD",
    name: "Sejal Glass Limited",
  },
  {
    tickerSymbol: "SELAN",
    name: "Selan Exploration Technology Limited",
  },
  {
    tickerSymbol: "SELMC",
    name: "SEL Manufacturing Company Limited",
  },
  {
    tickerSymbol: "SEPC",
    name: "SEPC Limited",
  },
  {
    tickerSymbol: "SEPOWER",
    name: "S.E. Power Limited",
  },
  {
    tickerSymbol: "SEQUENT",
    name: "Sequent Scientific Limited",
  },
  {
    tickerSymbol: "SERVOTECH",
    name: "Servotech Power Systems Limited",
  },
  {
    tickerSymbol: "SESHAPAPER",
    name: "Seshasayee Paper and Boards Limited",
  },
  {
    tickerSymbol: "SETCO",
    name: "Setco Automotive Limited",
  },
  {
    tickerSymbol: "SEYAIND",
    name: "Seya Industries Limited",
  },
  {
    tickerSymbol: "SFL",
    name: "Sheela Foam Limited",
  },
  {
    tickerSymbol: "SGIL",
    name: "Synergy Green Industries Limited",
  },
  {
    tickerSymbol: "SGL",
    name: "STL Global Limited",
  },
  {
    tickerSymbol: "SHAHALLOYS",
    name: "Shah Alloys Limited",
  },
  {
    tickerSymbol: "SHAILY",
    name: "Shaily Engineering Plastics Limited",
  },
  {
    tickerSymbol: "SHAKTIPUMP",
    name: "Shakti Pumps (India) Limited",
  },
  {
    tickerSymbol: "SHALBY",
    name: "Shalby Limited",
  },
  {
    tickerSymbol: "SHALPAINTS",
    name: "Shalimar Paints Limited",
  },
  {
    tickerSymbol: "SHANKARA",
    name: "Shankara Building Products Limited",
  },
  {
    tickerSymbol: "SHANTI",
    name: "Shanti Overseas (India) Limited",
  },
  {
    tickerSymbol: "SHANTIGEAR",
    name: "Shanthi Gears Limited",
  },
  {
    tickerSymbol: "SHARDACROP",
    name: "Sharda Cropchem Limited",
  },
  {
    tickerSymbol: "SHARDAMOTR",
    name: "Sharda Motor Industries Limited",
  },
  {
    tickerSymbol: "SHAREINDIA",
    name: "Share India Securities Limited",
  },
  {
    tickerSymbol: "SHEMAROO",
    name: "Shemaroo Entertainment Limited",
  },
  {
    tickerSymbol: "SHILPAMED",
    name: "Shilpa Medicare Limited",
  },
  {
    tickerSymbol: "SHIVALIK",
    name: "Shivalik Rasayan Limited",
  },
  {
    tickerSymbol: "SHIVAMAUTO",
    name: "Shivam Autotech Limited",
  },
  {
    tickerSymbol: "SHIVAMILLS",
    name: "Shiva Mills Limited",
  },
  {
    tickerSymbol: "SHIVATEX",
    name: "Shiva Texyarn Limited",
  },
  {
    tickerSymbol: "SHK",
    name: "S H Kelkar and Company Limited",
  },
  {
    tickerSymbol: "SHOPERSTOP",
    name: "Shoppers Stop Limited",
  },
  {
    tickerSymbol: "SHRADHA",
    name: "Shradha Infraprojects Limited",
  },
  {
    tickerSymbol: "SHREDIGCEM",
    name: "Shree Digvijay Cement Co.Ltd",
  },
  {
    tickerSymbol: "SHREECEM",
    name: "SHREE CEMENT LIMITED",
  },
  {
    tickerSymbol: "SHREEPUSHK",
    name: "Shree Pushkar Chemicals & Fertilisers Limited",
  },
  {
    tickerSymbol: "SHREERAMA",
    name: "Shree Rama Multi-Tech Limited",
  },
  {
    tickerSymbol: "SHRENIK",
    name: "Shrenik Limited",
  },
  {
    tickerSymbol: "SHREYANIND",
    name: "Shreyans Industries Limited",
  },
  {
    tickerSymbol: "SHREYAS",
    name: "Shreyas Shipping & Logistics Limited",
  },
  {
    tickerSymbol: "SHRIPISTON",
    name: "Shriram Pistons & Rings Limited",
  },
  {
    tickerSymbol: "SHRIRAMFIN",
    name: "Shriram Finance Limited",
  },
  {
    tickerSymbol: "SHRIRAMPPS",
    name: "Shriram Properties Limited",
  },
  {
    tickerSymbol: "SHYAMCENT",
    name: "Shyam Century Ferrous Limited",
  },
  {
    tickerSymbol: "SHYAMMETL",
    name: "Shyam Metalics and Energy Limited",
  },
  {
    tickerSymbol: "SHYAMTEL",
    name: "Shyam Telecom Limited",
  },
  {
    tickerSymbol: "SIEMENS",
    name: "Siemens Limited",
  },
  {
    tickerSymbol: "SIGACHI",
    name: "Sigachi Industries Limited",
  },
  {
    tickerSymbol: "SIGIND",
    name: "Signet Industries Limited",
  },
  {
    tickerSymbol: "SIKKO",
    name: "Sikko Industries Limited",
  },
  {
    tickerSymbol: "SIL",
    name: "Standard Industries Limited",
  },
  {
    tickerSymbol: "SILGO",
    name: "Silgo Retail Limited",
  },
  {
    tickerSymbol: "SILINV",
    name: "SIL Investments Limited",
  },
  {
    tickerSymbol: "SILLYMONKS",
    name: "Silly Monks Entertainment Limited",
  },
  {
    tickerSymbol: "SILVERTUC",
    name: "Silver Touch Technologies Limited",
  },
  {
    tickerSymbol: "SIMBHALS",
    name: "Simbhaoli Sugars Limited",
  },
  {
    tickerSymbol: "SIMPLEXINF",
    name: "Simplex Infrastructures Limited",
  },
  {
    tickerSymbol: "SINTERCOM",
    name: "Sintercom India Limited",
  },
  {
    tickerSymbol: "SIRCA",
    name: "Sirca Paints India Limited",
  },
  {
    tickerSymbol: "SIS",
    name: "SIS LIMITED",
  },
  {
    tickerSymbol: "SITINET",
    name: "Siti Networks Limited",
  },
  {
    tickerSymbol: "SIYSIL",
    name: "Siyaram Silk Mills Limited",
  },
  {
    tickerSymbol: "SJS",
    name: "S.J.S. Enterprises Limited",
  },
  {
    tickerSymbol: "SJVN",
    name: "SJVN Limited",
  },
  {
    tickerSymbol: "SKFINDIA",
    name: "SKF India Limited",
  },
  {
    tickerSymbol: "SKIPPER",
    name: "Skipper Limited",
  },
  {
    tickerSymbol: "SKMEGGPROD",
    name: "SKM Egg Products Export (India) Limited",
  },
  {
    tickerSymbol: "SKYGOLD",
    name: "Sky Gold Limited",
  },
  {
    tickerSymbol: "SMARTLINK",
    name: "Smartlink Holdings Limited",
  },
  {
    tickerSymbol: "SMCGLOBAL",
    name: "SMC Global Securities Limited",
  },
  {
    tickerSymbol: "SMLISUZU",
    name: "SML Isuzu Limited",
  },
  {
    tickerSymbol: "SMLT",
    name: "Sarthak Metals Limited",
  },
  {
    tickerSymbol: "SMSLIFE",
    name: "SMS Lifesciences India Limited",
  },
  {
    tickerSymbol: "SMSPHARMA",
    name: "SMS Pharmaceuticals Limited",
  },
  {
    tickerSymbol: "SNOWMAN",
    name: "Snowman Logistics Limited",
  },
  {
    tickerSymbol: "SOBHA",
    name: "Sobha Limited",
  },
  {
    tickerSymbol: "SOFTTECH",
    name: "Softtech Engineers Limited",
  },
  {
    tickerSymbol: "SOLARA",
    name: "Solara Active Pharma Sciences Limited",
  },
  {
    tickerSymbol: "SOLARINDS",
    name: "Solar Industries India Limited",
  },
  {
    tickerSymbol: "SOMANYCERA",
    name: "Somany Ceramics Limited",
  },
  {
    tickerSymbol: "SOMATEX",
    name: "Soma Textiles & Industries Limited",
  },
  {
    tickerSymbol: "SOMICONVEY",
    name: "Somi Conveyor Beltings Limited",
  },
  {
    tickerSymbol: "SONACOMS",
    name: "Sona BLW Precision Forgings Limited",
  },
  {
    tickerSymbol: "SONAMCLOCK",
    name: "Sonam Clock Limited",
  },
  {
    tickerSymbol: "SONATSOFTW",
    name: "Sonata Software Limited",
  },
  {
    tickerSymbol: "SOTL",
    name: "Savita Oil Technologies Limited",
  },
  {
    tickerSymbol: "SOUTHBANK",
    name: "The South Indian Bank Limited",
  },
  {
    tickerSymbol: "SOUTHWEST",
    name: "South West Pinnacle Exploration Limited",
  },
  {
    tickerSymbol: "SPAL",
    name: "S. P. Apparels Limited",
  },
  {
    tickerSymbol: "SPANDANA",
    name: "Spandana Sphoorty Financial Limited",
  },
  {
    tickerSymbol: "SPARC",
    name: "Sun Pharma Advanced Research Company Limited",
  },
  {
    tickerSymbol: "SPCENET",
    name: "Spacenet Enterprises India Limited",
  },
  {
    tickerSymbol: "SPECIALITY",
    name: "Speciality Restaurants Limited",
  },
  {
    tickerSymbol: "SPENCERS",
    name: "Spencer's Retail Limited",
  },
  {
    tickerSymbol: "SPIC",
    name: "Southern Petrochemicals Industries Corporation  Limited",
  },
  {
    tickerSymbol: "SPLIL",
    name: "SPL Industries Limited",
  },
  {
    tickerSymbol: "SPLPETRO",
    name: "Supreme Petrochem Limited",
  },
  {
    tickerSymbol: "SPMLINFRA",
    name: "SPML Infra Limited",
  },
  {
    tickerSymbol: "SPORTKING",
    name: "Sportking India Limited",
  },
  {
    tickerSymbol: "SREEL",
    name: "Sreeleathers Limited",
  },
  {
    tickerSymbol: "SRF",
    name: "SRF Limited",
  },
  {
    tickerSymbol: "SRHHYPOLTD",
    name: "Sree Rayalaseema Hi-Strength Hypo Limited",
  },
  {
    tickerSymbol: "SRPL",
    name: "Shree Ram Proteins Limited",
  },
  {
    tickerSymbol: "SSWL",
    name: "Steel Strips Wheels Limited",
  },
  {
    tickerSymbol: "STAR",
    name: "Strides Pharma Science Limited",
  },
  {
    tickerSymbol: "STARCEMENT",
    name: "Star Cement Limited",
  },
  {
    tickerSymbol: "STARHEALTH",
    name: "Star Health and Allied Insurance Company Limited",
  },
  {
    tickerSymbol: "STARPAPER",
    name: "Star Paper Mills Limited",
  },
  {
    tickerSymbol: "STARTECK",
    name: "Starteck Finance Limited",
  },
  {
    tickerSymbol: "STCINDIA",
    name: "The State Trading Corporation of India Limited",
  },
  {
    tickerSymbol: "STEELCAS",
    name: "Steelcast Limited",
  },
  {
    tickerSymbol: "STEELCITY",
    name: "Steel City Securities Limited",
  },
  {
    tickerSymbol: "STEELXIND",
    name: "STEEL EXCHANGE INDIA LIMITED",
  },
  {
    tickerSymbol: "STEL",
    name: "Stel Holdings Limited",
  },
  {
    tickerSymbol: "STERTOOLS",
    name: "Sterling Tools Limited",
  },
  {
    tickerSymbol: "STLTECH",
    name: "Sterlite Technologies Limited",
  },
  {
    tickerSymbol: "STOVEKRAFT",
    name: "Stove Kraft Limited",
  },
  {
    tickerSymbol: "STYLAMIND",
    name: "Stylam Industries Limited",
  },
  {
    tickerSymbol: "STYRENIX",
    name: "Styrenix Performance Materials Limited",
  },
  {
    tickerSymbol: "SUBEXLTD",
    name: "Subex Limited",
  },
  {
    tickerSymbol: "SUBROS",
    name: "Subros Limited",
  },
  {
    tickerSymbol: "SUDARSCHEM",
    name: "Sudarshan Chemical Industries Limited",
  },
  {
    tickerSymbol: "SUKHJITS",
    name: "Sukhjit Starch & Chemicals Limited",
  },
  {
    tickerSymbol: "SULA",
    name: "Sula Vineyards Limited",
  },
  {
    tickerSymbol: "SUMICHEM",
    name: "Sumitomo Chemical India Limited",
  },
  {
    tickerSymbol: "SUMIT",
    name: "Sumit Woods Limited",
  },
  {
    tickerSymbol: "SUMMITSEC",
    name: "Summit Securities Limited",
  },
  {
    tickerSymbol: "SUNCLAYLTD",
    name: "Sundaram Clayton Limited",
  },
  {
    tickerSymbol: "SUNDARAM",
    name: "Sundaram Multi Pap Limited",
  },
  {
    tickerSymbol: "SUNDARMFIN",
    name: "Sundaram Finance Limited",
  },
  {
    tickerSymbol: "SUNDARMHLD",
    name: "Sundaram Finance Holdings Limited",
  },
  {
    tickerSymbol: "SUNDRMBRAK",
    name: "Sundaram Brake Linings Limited",
  },
  {
    tickerSymbol: "SUNDRMFAST",
    name: "Sundram Fasteners Limited",
  },
  {
    tickerSymbol: "SUNFLAG",
    name: "Sunflag Iron And Steel Company Limited",
  },
  {
    tickerSymbol: "SUNPHARMA",
    name: "Sun Pharmaceutical Industries Limited",
  },
  {
    tickerSymbol: "SUNTECK",
    name: "Sunteck Realty Limited",
  },
  {
    tickerSymbol: "SUNTV",
    name: "Sun TV Network Limited",
  },
  {
    tickerSymbol: "SUPERHOUSE",
    name: "Superhouse Limited",
  },
  {
    tickerSymbol: "SUPERSPIN",
    name: "Super Spinning Mills Limited",
  },
  {
    tickerSymbol: "SUPRAJIT",
    name: "Suprajit Engineering Limited",
  },
  {
    tickerSymbol: "SUPREMEENG",
    name: "Supreme Engineering Limited",
  },
  {
    tickerSymbol: "SUPREMEIND",
    name: "Supreme Industries Limited",
  },
  {
    tickerSymbol: "SUPREMEINF",
    name: "Supreme Infrastructure India Limited",
  },
  {
    tickerSymbol: "SUPRIYA",
    name: "Supriya Lifescience Limited",
  },
  {
    tickerSymbol: "SURANASOL",
    name: "Surana Solar Limited",
  },
  {
    tickerSymbol: "SURANAT&P",
    name: "Surana Telecom and Power Limited",
  },
  {
    tickerSymbol: "SURYALAXMI",
    name: "Suryalakshmi Cotton Mills Limited",
  },
  {
    tickerSymbol: "SURYAROSNI",
    name: "Surya Roshni Limited",
  },
  {
    tickerSymbol: "SURYODAY",
    name: "Suryoday Small Finance Bank Limited",
  },
  {
    tickerSymbol: "SUTLEJTEX",
    name: "Sutlej Textiles and Industries Limited",
  },
  {
    tickerSymbol: "SUULD",
    name: "Suumaya Industries Limited",
  },
  {
    tickerSymbol: "SUVEN",
    name: "Suven Life Sciences Limited",
  },
  {
    tickerSymbol: "SUVENPHAR",
    name: "Suven Pharmaceuticals Limited",
  },
  {
    tickerSymbol: "SUVIDHAA",
    name: "Suvidhaa Infoserve Limited",
  },
  {
    tickerSymbol: "SUZLON",
    name: "Suzlon Energy Limited",
  },
  {
    tickerSymbol: "SVLL",
    name: "Shree Vasu Logistics Limited",
  },
  {
    tickerSymbol: "SVPGLOB",
    name: "SVP GLOBAL TEXTILES LIMITED",
  },
  {
    tickerSymbol: "SWANENERGY",
    name: "Swan Energy Limited",
  },
  {
    tickerSymbol: "SWARAJENG",
    name: "Swaraj Engines Limited",
  },
  {
    tickerSymbol: "SWELECTES",
    name: "Swelect Energy Systems Limited",
  },
  {
    tickerSymbol: "SWSOLAR",
    name: "Sterling and Wilson Renewable Energy Limited",
  },
  {
    tickerSymbol: "SYMPHONY",
    name: "Symphony Limited",
  },
  {
    tickerSymbol: "SYNCOMF",
    name: "Syncom Formulations (India) Limited",
  },
  {
    tickerSymbol: "SYNGENE",
    name: "Syngene International Limited",
  },
  {
    tickerSymbol: "SYRMA",
    name: "Syrma SGS Technology Limited",
  },
  {
    tickerSymbol: "TAINWALCHM",
    name: "Tainwala Chemical and Plastic (I) Limited",
  },
  {
    tickerSymbol: "TAJGVK",
    name: "Taj GVK Hotels & Resorts Limited",
  },
  {
    tickerSymbol: "TAKE",
    name: "Take Solutions Limited",
  },
  {
    tickerSymbol: "TALBROAUTO",
    name: "Talbros Automotive Components Limited",
  },
  {
    tickerSymbol: "TANLA",
    name: "Tanla Platforms Limited",
  },
  {
    tickerSymbol: "TANTIACONS",
    name: "Tantia Constructions Limited",
  },
  {
    tickerSymbol: "TARAPUR",
    name: "Tarapur Transformers Limited",
  },
  {
    tickerSymbol: "TARC",
    name: "TARC Limited",
  },
  {
    tickerSymbol: "TARMAT",
    name: "Tarmat Limited",
  },
  {
    tickerSymbol: "TARSONS",
    name: "Tarsons Products Limited",
  },
  {
    tickerSymbol: "TASTYBITE",
    name: "Tasty Bite Eatables Limited",
  },
  {
    tickerSymbol: "TATACHEM",
    name: "Tata Chemicals Limited",
  },
  {
    tickerSymbol: "TATACOFFEE",
    name: "Tata Coffee Limited",
  },
  {
    tickerSymbol: "TATACOMM",
    name: "Tata Communications Limited",
  },
  {
    tickerSymbol: "TATACONSUM",
    name: "TATA CONSUMER PRODUCTS LIMITED",
  },
  {
    tickerSymbol: "TATAELXSI",
    name: "Tata Elxsi Limited",
  },
  {
    tickerSymbol: "TATAINVEST",
    name: "Tata Investment Corporation Limited",
  },
  {
    tickerSymbol: "TATAMETALI",
    name: "Tata Metaliks Limited",
  },
  {
    tickerSymbol: "TATAMOTORS",
    name: "Tata Motors Limited",
  },
  {
    tickerSymbol: "TATAMTRDVR",
    name: "Tata Motors Limited",
  },
  {
    tickerSymbol: "TATAPOWER",
    name: "Tata Power Company Limited",
  },
  {
    tickerSymbol: "TATASTEEL",
    name: "Tata Steel Limited",
  },
  {
    tickerSymbol: "TATASTLLP",
    name: "Tata Steel Long Products Limited",
  },
  {
    tickerSymbol: "TATVA",
    name: "Tatva Chintan Pharma Chem Limited",
  },
  {
    tickerSymbol: "TBZ",
    name: "Tribhovandas Bhimji Zaveri Limited",
  },
  {
    tickerSymbol: "TCI",
    name: "Transport Corporation of India Limited",
  },
  {
    tickerSymbol: "TCIEXP",
    name: "TCI Express Limited",
  },
  {
    tickerSymbol: "TCNSBRANDS",
    name: "TCNS Clothing Co. Limited",
  },
  {
    tickerSymbol: "TCPLPACK",
    name: "TCPL Packaging Limited",
  },
  {
    tickerSymbol: "TCS",
    name: "Tata Consultancy Services Limited",
  },
  {
    tickerSymbol: "TDPOWERSYS",
    name: "TD Power Systems Limited",
  },
  {
    tickerSymbol: "TEAMLEASE",
    name: "Teamlease Services Limited",
  },
  {
    tickerSymbol: "TECHIN",
    name: "Techindia Nirman Limited",
  },
  {
    tickerSymbol: "TECHM",
    name: "Tech Mahindra Limited",
  },
  {
    tickerSymbol: "TECHNOE",
    name: "Techno Electric & Engineering Company Limited",
  },
  {
    tickerSymbol: "TECILCHEM",
    name: "TECIL Chemicals and Hydro Power Limited",
  },
  {
    tickerSymbol: "TEGA",
    name: "Tega Industries Limited",
  },
  {
    tickerSymbol: "TEJASNET",
    name: "Tejas Networks Limited",
  },
  {
    tickerSymbol: "TEMBO",
    name: "Tembo Global Industries Limited",
  },
  {
    tickerSymbol: "TERASOFT",
    name: "Tera Software Limited",
  },
  {
    tickerSymbol: "TEXINFRA",
    name: "Texmaco Infrastructure & Holdings Limited",
  },
  {
    tickerSymbol: "TEXMOPIPES",
    name: "Texmo Pipes and Products Limited",
  },
  {
    tickerSymbol: "TEXRAIL",
    name: "Texmaco Rail & Engineering Limited",
  },
  {
    tickerSymbol: "TFCILTD",
    name: "Tourism Finance Corporation of India Limited",
  },
  {
    tickerSymbol: "TFL",
    name: "Transwarranty Finance Limited",
  },
  {
    tickerSymbol: "TGBHOTELS",
    name: "TGB Banquets And Hotels Limited",
  },
  {
    tickerSymbol: "THANGAMAYL",
    name: "Thangamayil Jewellery Limited",
  },
  {
    tickerSymbol: "THEINVEST",
    name: "The Investment Trust Of India Limited",
  },
  {
    tickerSymbol: "THEMISMED",
    name: "Themis Medicare Limited",
  },
  {
    tickerSymbol: "THERMAX",
    name: "Thermax Limited",
  },
  {
    tickerSymbol: "THOMASCOOK",
    name: "Thomas Cook  (India)  Limited",
  },
  {
    tickerSymbol: "THOMASCOTT",
    name: "Thomas Scott (India) Limited",
  },
  {
    tickerSymbol: "THYROCARE",
    name: "Thyrocare Technologies Limited",
  },
  {
    tickerSymbol: "TI",
    name: "Tilaknagar Industries Limited",
  },
  {
    tickerSymbol: "TIDEWATER",
    name: "Tide Water Oil Company (India) Limited",
  },
  {
    tickerSymbol: "TIIL",
    name: "Technocraft Industries (India) Limited",
  },
  {
    tickerSymbol: "TIINDIA",
    name: "Tube Investments of India Limited",
  },
  {
    tickerSymbol: "TIJARIA",
    name: "Tijaria Polypipes Limited",
  },
  {
    tickerSymbol: "TIL",
    name: "TIL Limited",
  },
  {
    tickerSymbol: "TIMESGTY",
    name: "Times Guaranty Limited",
  },
  {
    tickerSymbol: "TIMETECHNO",
    name: "Time Technoplast Limited",
  },
  {
    tickerSymbol: "TIMKEN",
    name: "Timken India Limited",
  },
  {
    tickerSymbol: "TINPLATE",
    name: "The Tinplate Company of India Limited",
  },
  {
    tickerSymbol: "TIPSFILMS",
    name: "Tips Films Limited",
  },
  {
    tickerSymbol: "TIPSINDLTD",
    name: "TIPS Industries Limited",
  },
  {
    tickerSymbol: "TIRUMALCHM",
    name: "Thirumalai Chemicals Limited",
  },
  {
    tickerSymbol: "TIRUPATIFL",
    name: "Tirupati Forge Limited",
  },
  {
    tickerSymbol: "TITAN",
    name: "Titan Company Limited",
  },
  {
    tickerSymbol: "TMB",
    name: "Tamilnad Mercantile Bank Limited",
  },
  {
    tickerSymbol: "TNPETRO",
    name: "Tamilnadu PetroProducts Limited",
  },
  {
    tickerSymbol: "TNPL",
    name: "Tamil Nadu Newsprint & Papers Limited",
  },
  {
    tickerSymbol: "TNTELE",
    name: "Tamilnadu Telecommunication Limited",
  },
  {
    tickerSymbol: "TOKYOPLAST",
    name: "Tokyo Plast International Limited",
  },
  {
    tickerSymbol: "TORNTPHARM",
    name: "Torrent Pharmaceuticals Limited",
  },
  {
    tickerSymbol: "TORNTPOWER",
    name: "Torrent Power Limited",
  },
  {
    tickerSymbol: "TOTAL",
    name: "Total Transport Systems Limited",
  },
  {
    tickerSymbol: "TOUCHWOOD",
    name: "Touchwood Entertainment Limited",
  },
  {
    tickerSymbol: "TPLPLASTEH",
    name: "TPL Plastech Limited",
  },
  {
    tickerSymbol: "TRACXN",
    name: "Tracxn Technologies Limited",
  },
  {
    tickerSymbol: "TREEHOUSE",
    name: "Tree House Education & Accessories Limited",
  },
  {
    tickerSymbol: "TREJHARA",
    name: "TREJHARA SOLUTIONS LIMITED",
  },
  {
    tickerSymbol: "TRENT",
    name: "Trent Limited",
  },
  {
    tickerSymbol: "TRF",
    name: "TRF Limited",
  },
  {
    tickerSymbol: "TRIDENT",
    name: "Trident Limited",
  },
  {
    tickerSymbol: "TRIGYN",
    name: "Trigyn Technologies Limited",
  },
  {
    tickerSymbol: "TRIL",
    name: "Transformers And Rectifiers (India) Limited",
  },
  {
    tickerSymbol: "TRITURBINE",
    name: "Triveni Turbine Limited",
  },
  {
    tickerSymbol: "TRIVENI",
    name: "Triveni Engineering & Industries Limited",
  },
  {
    tickerSymbol: "TTKHLTCARE",
    name: "TTK Healthcare Limited",
  },
  {
    tickerSymbol: "TTKPRESTIG",
    name: "TTK Prestige Limited",
  },
  {
    tickerSymbol: "TTL",
    name: "T T Limited",
  },
  {
    tickerSymbol: "TTML",
    name: "Tata Teleservices (Maharashtra) Limited",
  },
  {
    tickerSymbol: "TV18BRDCST",
    name: "TV18 Broadcast Limited",
  },
  {
    tickerSymbol: "TVSELECT",
    name: "TVS Electronics Limited",
  },
  {
    tickerSymbol: "TVSMOTOR",
    name: "TVS Motor Company Limited",
  },
  {
    tickerSymbol: "TVSSRICHAK",
    name: "TVS Srichakra Limited",
  },
  {
    tickerSymbol: "TVTODAY",
    name: "TV Today Network Limited",
  },
  {
    tickerSymbol: "TVVISION",
    name: "TV Vision Limited",
  },
  {
    tickerSymbol: "TWL",
    name: "Titagarh Wagons Limited",
  },
  {
    tickerSymbol: "UBL",
    name: "United Breweries Limited",
  },
  {
    tickerSymbol: "UCALFUEL",
    name: "Ucal Fuel Systems Limited",
  },
  {
    tickerSymbol: "UCOBANK",
    name: "UCO Bank",
  },
  {
    tickerSymbol: "UDAICEMENT",
    name: "Udaipur Cement Works Limited",
  },
  {
    tickerSymbol: "UFLEX",
    name: "UFLEX Limited",
  },
  {
    tickerSymbol: "UFO",
    name: "UFO Moviez India Limited",
  },
  {
    tickerSymbol: "UGARSUGAR",
    name: "The Ugar Sugar Works Limited",
  },
  {
    tickerSymbol: "UGROCAP",
    name: "Ugro Capital Limited",
  },
  {
    tickerSymbol: "UJAAS",
    name: "Ujaas Energy Limited",
  },
  {
    tickerSymbol: "UJJIVAN",
    name: "Ujjivan Financial Services Limited",
  },
  {
    tickerSymbol: "UJJIVANSFB",
    name: "Ujjivan Small Finance Bank Limited",
  },
  {
    tickerSymbol: "ULTRACEMCO",
    name: "UltraTech Cement Limited",
  },
  {
    tickerSymbol: "UMAEXPORTS",
    name: "Uma Exports Limited",
  },
  {
    tickerSymbol: "UMANGDAIRY",
    name: "Umang Dairies Limited",
  },
  {
    tickerSymbol: "UMESLTD",
    name: "Usha Martin Education & Solutions Limited",
  },
  {
    tickerSymbol: "UNICHEMLAB",
    name: "Unichem Laboratories Limited",
  },
  {
    tickerSymbol: "UNIDT",
    name: "United Drilling Tools Limited",
  },
  {
    tickerSymbol: "UNIENTER",
    name: "Uniphos Enterprises Limited",
  },
  {
    tickerSymbol: "UNIINFO",
    name: "Uniinfo Telecom Services Limited",
  },
  {
    tickerSymbol: "UNIONBANK",
    name: "Union Bank of India",
  },
  {
    tickerSymbol: "UNIPARTS",
    name: "Uniparts India Limited",
  },
  {
    tickerSymbol: "UNITECH",
    name: "Unitech Limited",
  },
  {
    tickerSymbol: "UNITEDPOLY",
    name: "United Polyfab Gujarat Limited",
  },
  {
    tickerSymbol: "UNITEDTEA",
    name: "The United Nilgiri Tea Estates Company Limited",
  },
  {
    tickerSymbol: "UNIVASTU",
    name: "Univastu India Limited",
  },
  {
    tickerSymbol: "UNIVCABLES",
    name: "Universal Cables Limited",
  },
  {
    tickerSymbol: "UNIVPHOTO",
    name: "Universus Photo Imagings Limited",
  },
  {
    tickerSymbol: "UNOMINDA",
    name: "UNO Minda Limited",
  },
  {
    tickerSymbol: "UPL",
    name: "UPL Limited",
  },
  {
    tickerSymbol: "URJA",
    name: "Urja Global Limited",
  },
  {
    tickerSymbol: "USHAMART",
    name: "Usha Martin Limited",
  },
  {
    tickerSymbol: "USK",
    name: "Udayshivakumar Infra Limited",
  },
  {
    tickerSymbol: "UTIAMC",
    name: "UTI Asset Management Company Limited",
  },
  {
    tickerSymbol: "UTTAMSUGAR",
    name: "Uttam Sugar Mills Limited",
  },
  {
    tickerSymbol: "V2RETAIL",
    name: "V2 Retail Limited",
  },
  {
    tickerSymbol: "VADILALIND",
    name: "Vadilal Industries Limited",
  },
  {
    tickerSymbol: "VAIBHAVGBL",
    name: "Vaibhav Global Limited",
  },
  {
    tickerSymbol: "VAISHALI",
    name: "Vaishali Pharma Limited",
  },
  {
    tickerSymbol: "VAKRANGEE",
    name: "Vakrangee Limited",
  },
  {
    tickerSymbol: "VALIANTORG",
    name: "Valiant Organics Limited",
  },
  {
    tickerSymbol: "VARDHACRLC",
    name: "Vardhman Acrylics Limited",
  },
  {
    tickerSymbol: "VARDMNPOLY",
    name: "Vardhman Polytex Limited",
  },
  {
    tickerSymbol: "VARROC",
    name: "Varroc Engineering Limited",
  },
  {
    tickerSymbol: "VASCONEQ",
    name: "Vascon Engineers Limited",
  },
  {
    tickerSymbol: "VASWANI",
    name: "Vaswani Industries Limited",
  },
  {
    tickerSymbol: "VBL",
    name: "Varun Beverages Limited",
  },
  {
    tickerSymbol: "VCL",
    name: "Vaxtex Cotfab Limited",
  },
  {
    tickerSymbol: "VEDL",
    name: "Vedanta Limited",
  },
  {
    tickerSymbol: "VENKEYS",
    name: "Venky's (India) Limited",
  },
  {
    tickerSymbol: "VENUSPIPES",
    name: "Venus Pipes & Tubes Limited",
  },
  {
    tickerSymbol: "VENUSREM",
    name: "Venus Remedies Limited",
  },
  {
    tickerSymbol: "VERANDA",
    name: "Veranda Learning Solutions Limited",
  },
  {
    tickerSymbol: "VERTOZ",
    name: "Vertoz Advertising Limited",
  },
  {
    tickerSymbol: "VESUVIUS",
    name: "Vesuvius India Limited",
  },
  {
    tickerSymbol: "VETO",
    name: "Veto Switchgears And Cables Limited",
  },
  {
    tickerSymbol: "VGUARD",
    name: "V-Guard Industries Limited",
  },
  {
    tickerSymbol: "VHL",
    name: "Vardhman Holdings Limited",
  },
  {
    tickerSymbol: "VICEROY",
    name: "Viceroy Hotels Limited",
  },
  {
    tickerSymbol: "VIDHIING",
    name: "Vidhi Specialty Food Ingredients Limited",
  },
  {
    tickerSymbol: "VIJAYA",
    name: "Vijaya Diagnostic Centre Limited",
  },
  {
    tickerSymbol: "VIJIFIN",
    name: "Viji Finance Limited",
  },
  {
    tickerSymbol: "VIKASECO",
    name: "Vikas EcoTech Limited",
  },
  {
    tickerSymbol: "VIKASLIFE",
    name: "Vikas Lifecare Limited",
  },
  {
    tickerSymbol: "VIMTALABS",
    name: "Vimta Labs Limited",
  },
  {
    tickerSymbol: "VINATIORGA",
    name: "Vinati Organics Limited",
  },
  {
    tickerSymbol: "VINDHYATEL",
    name: "Vindhya Telelinks Limited",
  },
  {
    tickerSymbol: "VINEETLAB",
    name: "Vineet Laboratories Limited",
  },
  {
    tickerSymbol: "VINNY",
    name: "Vinny Overseas Limited",
  },
  {
    tickerSymbol: "VINYLINDIA",
    name: "Vinyl Chemicals (India) Limited",
  },
  {
    tickerSymbol: "VIPCLOTHNG",
    name: "VIP Clothing Limited",
  },
  {
    tickerSymbol: "VIPIND",
    name: "VIP Industries Limited",
  },
  {
    tickerSymbol: "VIPULLTD",
    name: "Vipul Limited",
  },
  {
    tickerSymbol: "VIRINCHI",
    name: "Virinchi Limited",
  },
  {
    tickerSymbol: "VISAKAIND",
    name: "Visaka Industries Limited",
  },
  {
    tickerSymbol: "VISASTEEL",
    name: "Visa Steel Limited",
  },
  {
    tickerSymbol: "VISESHINFO",
    name: "Visesh Infotecnics Limited",
  },
  {
    tickerSymbol: "VISHAL",
    name: "Vishal Fabrics Limited",
  },
  {
    tickerSymbol: "VISHNU",
    name: "Vishnu Chemicals Limited",
  },
  {
    tickerSymbol: "VISHWARAJ",
    name: "Vishwaraj Sugar Industries Limited",
  },
  {
    tickerSymbol: "VIVIDHA",
    name: "Visagar Polytex Limited",
  },
  {
    tickerSymbol: "VLSFINANCE",
    name: "VLS Finance Limited",
  },
  {
    tickerSymbol: "VMART",
    name: "V-Mart Retail Limited",
  },
  {
    tickerSymbol: "VOLTAMP",
    name: "Voltamp Transformers Limited",
  },
  {
    tickerSymbol: "VOLTAS",
    name: "Voltas Limited",
  },
  {
    tickerSymbol: "VRLLOG",
    name: "VRL Logistics Limited",
  },
  {
    tickerSymbol: "VSSL",
    name: "Vardhman Special Steels Limited",
  },
  {
    tickerSymbol: "VSTIND",
    name: "VST Industries Limited",
  },
  {
    tickerSymbol: "VSTTILLERS",
    name: "V.S.T Tillers Tractors Limited",
  },
  {
    tickerSymbol: "VTL",
    name: "Vardhman Textiles Limited",
  },
  {
    tickerSymbol: "WABAG",
    name: "VA Tech Wabag Limited",
  },
  {
    tickerSymbol: "WALCHANNAG",
    name: "Walchandnagar Industries Limited",
  },
  {
    tickerSymbol: "WANBURY",
    name: "Wanbury Limited",
  },
  {
    tickerSymbol: "WATERBASE",
    name: "Waterbase Limited",
  },
  {
    tickerSymbol: "WEALTH",
    name: "Wealth First Portfolio Managers Limited",
  },
  {
    tickerSymbol: "WEBELSOLAR",
    name: "Websol Energy System Limited",
  },
  {
    tickerSymbol: "WEIZMANIND",
    name: "Weizmann Limited",
  },
  {
    tickerSymbol: "WEL",
    name: "Wonder Electricals Limited",
  },
  {
    tickerSymbol: "WELCORP",
    name: "Welspun Corp Limited",
  },
  {
    tickerSymbol: "WELENT",
    name: "Welspun Enterprises Limited",
  },
  {
    tickerSymbol: "WELINV",
    name: "Welspun Investments and Commercials Limited",
  },
  {
    tickerSymbol: "WELSPUNIND",
    name: "Welspun India Limited",
  },
  {
    tickerSymbol: "WENDT",
    name: "Wendt (India) Limited",
  },
  {
    tickerSymbol: "WESTLIFE",
    name: "WESTLIFE FOODWORLD LIMITED",
  },
  {
    tickerSymbol: "WEWIN",
    name: "WE WIN LIMITED",
  },
  {
    tickerSymbol: "WHEELS",
    name: "Wheels India Limited",
  },
  {
    tickerSymbol: "WHIRLPOOL",
    name: "Whirlpool of India Limited",
  },
  {
    tickerSymbol: "WILLAMAGOR",
    name: "Williamson Magor & Company Limited",
  },
  {
    tickerSymbol: "WINDLAS",
    name: "Windlas Biotech Limited",
  },
  {
    tickerSymbol: "WINDMACHIN",
    name: "Windsor Machines Limited",
  },
  {
    tickerSymbol: "WIPL",
    name: "The Western India Plywoods Limited",
  },
  {
    tickerSymbol: "WIPRO",
    name: "Wipro Limited",
  },
  {
    tickerSymbol: "WOCKPHARMA",
    name: "Wockhardt Limited",
  },
  {
    tickerSymbol: "WONDERLA",
    name: "Wonderla Holidays Limited",
  },
  {
    tickerSymbol: "WORTH",
    name: "Worth Peripherals Limited",
  },
  {
    tickerSymbol: "WSI",
    name: "W S Industries (I) Limited",
  },
  {
    tickerSymbol: "WSTCSTPAPR",
    name: "West Coast Paper Mills Limited",
  },
  {
    tickerSymbol: "XCHANGING",
    name: "Xchanging Solutions Limited",
  },
  {
    tickerSymbol: "XELPMOC",
    name: "Xelpmoc Design And Tech Limited",
  },
  {
    tickerSymbol: "XPROINDIA",
    name: "Xpro India Limited",
  },
  {
    tickerSymbol: "YAARI",
    name: "Yaari Digital Integrated Services Limited",
  },
  {
    tickerSymbol: "YESBANK",
    name: "Yes Bank Limited",
  },
  {
    tickerSymbol: "YUKEN",
    name: "Yuken India Limited",
  },
  {
    tickerSymbol: "ZEEL",
    name: "Zee Entertainment Enterprises Limited",
  },
  {
    tickerSymbol: "ZEELEARN",
    name: "Zee Learn Limited",
  },
  {
    tickerSymbol: "ZEEMEDIA",
    name: "Zee Media Corporation Limited",
  },
  {
    tickerSymbol: "ZENITHEXPO",
    name: "Zenith Exports Limited",
  },
  {
    tickerSymbol: "ZENITHSTL",
    name: "Zenith Steel Pipes & Industries Limited",
  },
  {
    tickerSymbol: "ZENSARTECH",
    name: "Zensar Technologies Limited",
  },
  {
    tickerSymbol: "ZENTEC",
    name: "Zen Technologies Limited",
  },
  {
    tickerSymbol: "ZFCVINDIA",
    name: "ZF Commercial Vehicle Control Systems India Limited",
  },
  {
    tickerSymbol: "ZIMLAB",
    name: "Zim Laboratories Limited",
  },
  {
    tickerSymbol: "ZODIAC",
    name: "Zodiac Energy Limited",
  },
  {
    tickerSymbol: "ZODIACLOTH",
    name: "Zodiac Clothing Company Limited",
  },
  {
    tickerSymbol: "ZOMATO",
    name: "Zomato Limited",
  },
  {
    tickerSymbol: "ZOTA",
    name: "Zota Health Care LImited",
  },
  {
    tickerSymbol: "ZUARI",
    name: "Zuari Agro Chemicals Limited",
  },
  {
    tickerSymbol: "ZUARIIND",
    name: "ZUARI INDUSTRIES LIMITED",
  },
  {
    tickerSymbol: "ZYDUSLIFE",
    name: "Zydus Lifesciences Limited",
  },
  {
    tickerSymbol: "ZYDUSWELL",
    name: "Zydus Wellness Limited",
  },
];

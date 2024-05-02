import { ASSETS_URL } from "../constants";
import { AssetType, Domain, SkillCard } from "../types";

export const getEmblemUrl = (domainName: Domain, extension = "png") => {
	return `${domainName}.${extension}`;
};

export const getCardAssetUrl = (
	domainName: Domain,
	assetType: AssetType,
	extension = "png"
) => {
	return `${ASSETS_URL.CARDS}/${assetType}${domainName}.${extension}`;
};

export const filterCardByDomain = (
	cardsList: SkillCard[],
	domainsList: Domain[],
	emptyReturnAll = true
) => {
	const filterred = cardsList.filter((card) => {
		if (!domainsList.length) {
			return emptyReturnAll;
		}

		return domainsList.includes(card.domain);
	});

	return filterred;
};

export const filterCardByHomebrew = (
	cardsList: SkillCard[],
	targetHomebrewStatus: boolean
) => {
	const filterred = cardsList.filter((card) => {
		return card.isHomebrew === targetHomebrewStatus;
	});

	return filterred;
};

export const sortSkillCard = (
	cardsList: SkillCard[],
	sortAttr: keyof SkillCard,
	options: {
		levelTieBreaker?: boolean;
		groupByDomain?: boolean;
	} = {}
) => {
	const { levelTieBreaker = true, groupByDomain = true } = options;
	const sorted = cardsList.sort((cardA, cardB) => {
		const [sortValueA, sortValueB] = [cardA[sortAttr], cardB[sortAttr]];

		if (!sortValueA || !sortValueB) {
			return 0;
		}

		if (sortValueA === sortValueB && levelTieBreaker) {
			return cardA.level - cardB.level;
		}

		if (sortValueA < sortValueB) {
			return -1;
		}

		return 1;
	}).sort((cardA, cardB) => {
    if (!groupByDomain) {
      return 0;
    }

    if (cardA.domain < cardB.domain) {
      return -1;
    }

    return 1;
  });

	return sorted;
};

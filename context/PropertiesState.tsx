import { useReducer, useEffect } from "react";
import axios from "axios";
import PropertiesReducer from "./PropertiesReducer";
import PropertiesContext from "./PropertiesContext";
import { IPropertiesId, IPropertiesState } from "../../types";
import { createIdsUrl, createTypesUrl, orderByPrice } from "../../utils";
const apiUrl = process.env.API_BASE_URL;
interface Props {
  children: JSX.Element | JSX.Element[];
}
const initialState: IPropertiesState = {
  cityFilter: "madrid",
  isContextReady: true,
  isLoadingProperties: false,
  itemsPerPage: 30,
  page: 0,
  priceOrder: "asc",
  properties: [],
  propertiesIds: [],
  selectedProperty: null,
  totalProperties: 0,
  typeFilter: [],
};

const PropertiesState = ({ children }: Props) => {
  const [propertiesState, dispatch] = useReducer(
    PropertiesReducer,
    initialState
  );

  const {
    cityFilter,
    itemsPerPage,
    page,
    priceOrder,
    properties,
    propertiesIds,
    totalProperties,
    typeFilter,
  } = propertiesState;

  // Actions
  const setCityFilter = (cityFilter: string) => {
    dispatch({
      type: "SET_CITY",
      payload: cityFilter ? cityFilter.toLocaleLowerCase() : "madrid",
    });
  };
  const setPriceOrder = (priceOrder: string) =>
    dispatch({ type: "SET_PRICE_ORDER", payload: priceOrder });
  const setTypeFilter = (typeFilter: string[]) =>
    dispatch({ type: "SET_TYPE_FILTER", payload: [...typeFilter] });
  const setPage = (page: number) =>
    dispatch({ type: "SET_PAGE", payload: page - 1 });
  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch({ type: "SET_ITEMS_PER_PAGE", payload: itemsPerPage });

  const getPropertiesIds = async (
    city: string = "madrid",
    order: string,
    type: string
  ) => {
    const typesUrl =
      type.length && createTypesUrl(typeFilter, page, itemsPerPage);
    const url = type.length
      ? `${apiUrl}markers/${city}?${typesUrl}`
      : `${apiUrl}markers/${city}`;
    const response = await axios.get(url);
    const {
      status,
      data: { ok, data },
    } = response;
    if (status === 200 && ok) {
      const orderedProperties = orderByPrice(data, order, false);
      dispatch({
        type: "SET_PROPERTIES_IDS",
        payload: orderedProperties,
      });
    }
  };

  const getProperties = async (
    ids: IPropertiesId[],
    page: number = 0,
    limit: number = 30
  ) => {
    try {
      dispatch({ type: "SET_IS_LOADING", payload: true });
      const idsUrl = createIdsUrl(ids, page, limit);
      if (propertiesIds.length) {
        const response = await axios.get(`${apiUrl}homecards_ids?${idsUrl}`);
        const {
          status,
          data: { ok, data },
        } = response;
        const orderedProperties = orderByPrice(
          data.homecards,
          priceOrder,
          true
        );
        dispatch({
          type: "SET_PROPERTIES",
          payload: status === 200 && ok ? [...orderedProperties] : [],
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "SET_PROPERTIES",
        payload: [],
      });
      throw error;
    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false });
    }
  };

  // Effects
  useEffect(() => {
    getPropertiesIds(cityFilter, priceOrder, typeFilter);
  }, [cityFilter, typeFilter]);

  useEffect(() => {
    const orderedIds = orderByPrice(propertiesIds, priceOrder, false);
    dispatch({
      type: "SET_PROPERTIES_IDS",
      payload: [...orderedIds],
    });
  }, [priceOrder]);

  useEffect(() => {
    if (propertiesIds.length) {
      getProperties(propertiesIds, page, itemsPerPage);
    }
  }, [propertiesIds, page, itemsPerPage]);

  useEffect(() => {
    if (properties) {
      dispatch({
        ...propertiesState,
        isLoadingProperties: false,
      });
    }
  }, [properties]);

  const contextValue = {
    cityFilter,
    getProperties,
    itemsPerPage,
    page,
    priceOrder,
    properties: propertiesState.properties ?? [],
    selectedProperty: propertiesState.selectedProperty ?? [],
    setCityFilter,
    setItemsPerPage,
    setPage,
    setPriceOrder,
    setTypeFilter,
    totalProperties,
    typeFilter,
  };

  return (
    <PropertiesContext.Provider value={contextValue}>
      {children}
    </PropertiesContext.Provider>
  );
};

export default PropertiesState;

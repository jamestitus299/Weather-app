import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApioptions, LOC_API_URL, LOC_API_KEY } from "../api";
import "./search.css";

const Search = ({ onSearchChange }) => {
	const [search, setSearch] = useState(null);

	const handleOnChange = (searchData) => {
		setSearch(searchData);
		onSearchChange(searchData);
		// console.log(searchData);
	};

	const loadOptions = async (inputValue) => {
		// console.log(inputValue);
		return fetch(
			`${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
			geoApioptions
		)
			.then((response) => response.json())
			.then((response) => {
				// console.log(response);
				if (response.data.length === 0) {
					alert(
						"Sorry! The city you entered is invalid. Please enter a valid City"
					);
				} else {
					return {
						options: response.data.map((city) => {
							return {
								value: `${city.latitude} ${city.longitude}`,
								label: `${city.name}, ${city.countryCode}`,
							};
						}),
					};
				}
			})
			.catch((err) => {
				console.error(err);
				alert("Sorry! An ERROR occured. Please try again");
			});
	};

	const currentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getPosition);
		} else {
			console.log("Geolocation is not supported by this browser.");
		}

		function getPosition(position) {
			// console.log(position);
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			// console.log("Latitude: " + latitude + ", Longitude: " + longitude);

			// const locationName = fetch(`${LOC_API_URL}/json?latlng=${latitude},${longitude}&key=${LOC_API_KEY}`)
			// 	.then((response) => response.json())
			// 	.then((data) => {
			// 		// const address = data.results[0].formatted_address;
			// 		// console.log("Current location:", address);
			// 		console.log(data);
			// 	})
			// 	.catch((error) => {
			// 		console.error("Error:", error);
			// 	});

			const data = {
				value: `${latitude} ${longitude}`,
				label: "Your Location",
			};
			setSearch(data);
			onSearchChange(data);
		}
	};

	return (
		<div className="search-bar">
			<div className="loc-input">
				<AsyncPaginate
					placeholder="Type a city name..."
					debounceTimeout={600}
					value={search}
					onChange={handleOnChange}
					loadOptions={loadOptions}
				/>
			</div>

			<button className="loc-button" onClick={currentLocation}>
				My Location
			</button>
		</div>
	);
};

export default Search;

import { FaFilter } from "react-icons/fa";

const FilterSection = () => {
    return (
        <div>
            <section className="relative w-full">
                <div className="w-full">
                    <div>
                        <div>
                            <div className="box rounded-lg border border-gray-200 bg-white p-6 w-full">
                                <h6 className="font-medium text-base leading-7 text-black mb-5">
                                    <FaFilter className="inline-flex items-center gap-2 text-md" /> Filter
                                </h6>
                                <div className="flex items-center mb-5 gap-1">
                                    <div className="relative w-full">
                                        <label
                                            htmlFor="countries"
                                            className="block mb-2 text-sm font-medium text-gray-600 w-full"
                                        >
                                            By Animal Types
                                        </label>
                                        <select
                                            id="FROM"
                                            className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-lg block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white"
                                        >
                                            <option selected="">Select</option>
                                            <option value="option 1">option 1</option>
                                            <option value="option 2">option 2</option>
                                            <option value="option 3">option 3</option>
                                            <option value="option 4">option 4</option>
                                        </select>
                                                            
                                    </div>
                                </div>
                                <label
                                    htmlFor="countries"
                                    className="block mb-2 text-sm font-medium text-gray-600 w-full"
                                >
                                    By Age
                                </label>
                                <div className="relative w-full mb-8">
                                    <select
                                        id="FROM"
                                        className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-lg block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white"
                                    >
                                        <option selected="">Write code</option>
                                        <option value="option 1">option 1</option>
                                        <option value="option 2">option 2</option>
                                        <option value="option 3">option 3</option>
                                        <option value="option 4">option 4</option>
                                    </select>
                                    <svg
                                        className="absolute top-1/2 -translate-y-1/2 right-4 z-50"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
                                            stroke="#111827"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <button className="w-full py-2.5 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white font-semibold text-xs shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-200  ">
                                    <svg
                                        width={17}
                                        height={16}
                                        viewBox="0 0 17 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M14.4987 13.9997L13.1654 12.6663M13.832 7.33301C13.832 10.6467 11.1457 13.333 7.83203 13.333C4.51832 13.333 1.83203 10.6467 1.83203 7.33301C1.83203 4.0193 4.51832 1.33301 7.83203 1.33301C11.1457 1.33301 13.832 4.0193 13.832 7.33301Z"
                                            stroke="white"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Search
                                </button>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FilterSection;
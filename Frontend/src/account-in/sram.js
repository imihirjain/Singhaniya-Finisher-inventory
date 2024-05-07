<div className="border-login border-[1px] rounded-xl overflow-hidden mt-8">
            <div className="mt-4">
              <label
                htmlFor="quantity"
                className="block ml-4 font-login text-lg text-gray-700"
              >
                Quality
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  className="mt-4 block mb-4 ml-4 w-[300px] rounded-xs shadow-black shadow-sm border-gray-300 rounded-xs focus:ring-darkgray focus:border-darkgray sm:text-sm placeholder:font-login text-[24px]"
                  placeholder="Your answer"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <ChevronDownIcon
                  className="ml-2 mt-4 h-5 w-5 "
                  aria-hidden="true"
                />
              
              </div>
            </div>
          </div>
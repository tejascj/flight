<Modal className="modal modal-xl" show={showModal} onHide={handleModalClose} centered>
                          <Modal.Header closeButton>
                            <Modal.Title>Flight Booking</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {selectedFlight && (


                              <div className="row">
                                <div className="col-8">
                                  <div classname="row">

                                    <div className='container  my-3 p-2 w-100 border'>
                                      <div className='container w-100 p-0 bg-light'><h5><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="16" height="16"><path d="M381 114.9L186.1 41.8c-16.7-6.2-35.2-5.3-51.1 2.7L89.1 67.4C78 73 77.2 88.5 87.6 95.2l146.9 94.5L136 240 77.8 214.1c-8.7-3.9-18.8-3.7-27.3 .6L18.3 230.8c-9.3 4.7-11.8 16.8-5 24.7l73.1 85.3c6.1 7.1 15 11.2 24.3 11.2H248.4c5 0 9.9-1.2 14.3-3.4L535.6 212.2c46.5-23.3 82.5-63.3 100.8-112C645.9 75 627.2 48 600.2 48H542.8c-20.2 0-40.2 4.8-58.2 14L381 114.9zM0 480c0 17.7 14.3 32 32 32H608c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32z" /></svg>Flight Details</h5><hr /></div>
                                      <div className="container my-3 p-2 w-100 ">
                                        <div className="row">
                                          <div className="col-3">
                                            <img src={`https://images.kiwi.com/airlines/64/${amadeusResponse[index].itineraries[0].segments[0].carrierCode}.png`} alt={amadeusResponse[index].itineraries[0].segments[0].carrierCode} />
                                          </div>
                                          <div className="col-9">
                                            <div className="row">
                                              <div className="col-3">
                                                <div className="origin">
                                                  {selectedAirport1.city}
                                                  <div className="departure-time">{amadeusResponse[index].itineraries[0].segments[0].departure.at}</div>
                                                </div>
                                              </div>
                                              <div className="col-6 ">
                                                <div class="col-6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L14.293 8 8.646 2.354a.5.5 0 0 1 0-.708z"></path><path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path></svg></div></div>

                                              <div className="col-3">
                                                <div className="destination">
                                                  {selectedAirport2.city}
                                                  <div className="arrival-time">{amadeusResponse[index].itineraries[0].segments[0].arrival.at}</div>
                                                </div>
                                              </div>


                                            </div>
                                            <div className="row">
                                              <div className="col-12">
                                                <div className="flight-code">Flight Code:{amadeusResponse[index].itineraries[0].segments[0].carrierCode} {amadeusResponse[index].itineraries[0].segments[0].number}</div>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>
                                    </div>
                                    {/* IMP Things */}
                                    <div className='container  my-3 p-2 w-100 bg-light'>
                                      <div className="container">
                                        <h5><img src='https://flight.easemytrip.com/m_content/img/f-icon-9.png'></img>Good to Know</h5>
                                        <p>Information you should know</p>
                                        <ul>
                                          <li>Airline Cancellation Fee is Rs 3000 per passenger for your selected flight on the sector Bangalore to Guwahati</li>
                                          <li>Certify your health status through the Aarogya Setu app or the self-declaration form at the airport</li>
                                          <li>Remember to web check-in before arriving at the airport</li>
                                          <li>Face masks are compulsory</li>
                                        </ul>
                                      </div>
                                    </div>
                                    {/* End of IMP Things */}
                                    <div className="col-12">
                                      <div className='my-3 p-2 w-100 bg-light '>
                                        <div className='container w-100 bg-light'>Passenger Details <hr /></div>
                                        {passengerIndexes.map((index) => (
                                          <div className="row mb-3" key={index}>
                                            <h2>{`Passenger ${index + 1}`}</h2>
                                            <div className="col">
                                              <input
                                                type="text"
                                                className="form-control mb-3"
                                                placeholder={`First Name`}
                                                required
                                                value={passengerNames[index]?.firstName || ''}
                                                onChange={(e) => handlePassengerInputChange(e, index)}
                                              />
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder={`Last Name`}
                                                required
                                                value={passengerNames[index]?.lastName || ''}
                                                onChange={(e) => handlePassengerInputChange(e, index)}
                                              />
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      <div>
                                        <p><h5>Contact Information</h5>Your ticket will be sent to this email address</p>
                                        <input type="email" className="form-control mb-3" placeholder="Email Address" required />
                                      </div>
                                      <div>
                                        <p><h5>Phone Number</h5></p>
                                        <input type="text" className="form-control mb-3" placeholder="Phone Number" required />
                                      </div>
                                    </div>

                                  </div>
                                  <div className="col-12">
                                    <div className="card">
                                      <div className="card-body">
                                        <h5 className="card-title">Payment</h5>
                                        <p className="card-text">Please enter your credit card details below</p>
                                        <input type="text" className="form-control mb-3" value={cardNumber}
                                          onChange={handleCardNumberChange}
                                          maxLength="19"
                                          placeholder="Card Number"
                                          required />
                                        <input type="text" className="form-control mb-3" value={cardName}
                                          placeholder="Name on Card"
                                          onChange={handleCardNameChange}
                                          required />

                                        <input type="text" className="form-control mb-3" value={expiry}
                                          onChange={handleExpiryChange}
                                          maxLength="5"
                                          placeholder="MM/YY"
                                          required />
                                        <input type="text" className="form-control mb-3"
                                          placeholder="CVV"
                                          value={cvv}
                                          onChange={handleCvvChange}
                                          maxLength="3"
                                          required />
                                      </div>
                                    </div>
                                  </div>
                                  <input type="checkbox" className="form-check-input mb-3" id="terms" required />
                                  <label htmlFor="terms" className="form-check-label">I agree to the terms and conditions</label>
                                </div>
                                <div className="col-4">
                                  <div className="container  my-3 p-2 w-100 bg-light" style={{ position: 'sticky', top: '20px' }}>
                                    <div className='container'><h5 >Price Summary</h5><hr /></div>

                                    <div>
                                      <div className="row">
                                        <div className="col-8 text-start">
                                          <p>Base Price (People X {people})</p>
                                        </div>
                                        <div className="col-4 text-end">
                                          <p>₹{amadeusResponse[index].price.base}</p>
                                        </div>
                                      </div>
                                      <hr />
                                      <div className="row">
                                        <div className="col-8 text-start">
                                          <p>Taxes+</p>
                                        </div>
                                        <div className="col-4 text-end">
                                          <p>₹{amadeusResponse[index].price.total - amadeusResponse[index].price.base}</p>
                                        </div>
                                      </div>
                                      <hr />
                                      < div className="row">
                                        <div className="col-8 text-start">
                                          <p>Total Price</p>
                                        </div>
                                        <div className="col-4 text-end">
                                          <p>₹{amadeusResponse[index].price.total}</p>
                                        </div>
                                      </div>



                                    </div>
                                  </div>


                                </div>
                              </div>


                            )}

                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                            <Button variant="primary" >Book</Button>
                          </Modal.Footer>
                        </Modal>

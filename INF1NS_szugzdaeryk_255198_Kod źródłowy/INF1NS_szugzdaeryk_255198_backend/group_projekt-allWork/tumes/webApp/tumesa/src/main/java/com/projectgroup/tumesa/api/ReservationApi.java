package com.projectgroup.tumesa.api;

import java.util.List;

public class ReservationApi {

  private List<com.projectgroup.tumesa.models.Reservation> data;
  private Integer page;
  private Integer pageCount;

  public ReservationApi(List<com.projectgroup.tumesa.models.Reservation> data, Integer page,
      Integer pageCount) {
    this.data = data;
    this.page = page;
    this.pageCount = pageCount;
  }

  public List<com.projectgroup.tumesa.models.Reservation> getData() {
    return data;
  }

  public Integer getPage() {
    return page;
  }

  public Integer getPageCount() {
    return pageCount;
  }
}

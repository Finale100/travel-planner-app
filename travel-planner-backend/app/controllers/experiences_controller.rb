class ExperiencesController < ApplicationController

  before_action :find_experience, only: [:show, :update, :destroy]

  def index
    render json: Experience.all
  end

  def create
    render json: Experience.create(ticket_params)
  end

  def show
    render json: @experience
  end

  def update
    @experience.update(trip_params)
    if @experience.save
      render json: @experience, status: :accepted
    else
      render json: { errors: @experience.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    render json: @experience.destroy
  end

  private

  def find_ticket
    @experience = Experience.find(params[:id])
  end

  def experience_params
    params.permit(:name, :address, :city, :date, :relevant_info, :trip_id)
  end
end
